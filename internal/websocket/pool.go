package websocket

import (
	"context"

	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"
	"go.temporal.io/sdk/client"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message

	TemporalClient client.Client
}

func NewPool(tc client.Client) *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),

		TemporalClient: tc,
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			for c, _ := range pool.Clients {
				if c.ID == client.ID {
					delete(pool.Clients, c)
					break
				}
			}

			pool.Clients[client] = true

			log.Info().Msgf("Size of Connection Pool: %d", len(pool.Clients))
			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			log.Info().Msgf("Size of Connection Pool: %d", len(pool.Clients))
			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			}
			break
		case message := <-pool.Broadcast:
			for client, _ := range pool.Clients {
				if client.ID == message.ID {
					wid := "prompt-generation_" + client.ID
					desc, err := pool.TemporalClient.DescribeWorkflowExecution(context.Background(), wid, "")

					if err != nil {
						break
					}

					for _, activity := range desc.PendingActivities {
						heartbeats := activity.GetHeartbeatDetails()

						if heartbeats == nil {
							continue
						}

						payloads := heartbeats.GetPayloads()
						if len(payloads) == 0 {
							continue
						}

						lastPayload := payloads[len(payloads)-1]
						if lastPayload.Data != nil {
							log.Info().Msgf("Wrote %d bytes of data", lastPayload.Size())
							client.Conn.WriteMessage(websocket.BinaryMessage, lastPayload.Data)
						}
					}
				}
			}
		}
	}
}
