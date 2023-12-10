package websocket

import (
	// "context"
	"context"
	"fmt"

	"github.com/gorilla/websocket"
	"go.temporal.io/sdk/client"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message

	TemporalClient client.Client
    // Connections map[string]string
}


func NewPool(tc client.Client) *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),

        TemporalClient: tc,
        // Connections: make(map[string]string),
	}
}

func (pool *Pool) Start() {
	// ticker := time.NewTicker(3 * time.Second)
	//
	// for range ticker.C {
	//
	// 	desc, err := c.DescribeWorkflowExecution(context.Background(), we.GetID(), we.GetRunID())
	//
	// 	if err != nil {
	// 		log.Println("Couldn't retrieve workflow execution details", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
	// 	}
	//
	// 	for _, activity := range desc.PendingActivities {
	// 		heartbeats := activity.GetHeartbeatDetails()
	// 		if heartbeats == nil {
	// 			continue
	// 		}
	//
	// 		payloads := heartbeats.GetPayloads()
	// 		if len(payloads) == 0 {
	// 			return
	// 		}
	//
	// 		// lastPayload := payloads[len(payloads) - 1]
	// 		log.Println(payloads)
	// 	}
	//
	// 	log.Println(desc.WorkflowExecutionInfo.Status)
	// }
	//
	//
	//

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

			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			}
			break
		case message := <-pool.Broadcast:
			for client, _ := range pool.Clients {
                if client.ID == message.ID {
                    // client.Conn.WriteMessage()

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

                         lastPayload := payloads[len(payloads) - 1]
                         if lastPayload.Data != nil {
                             fmt.Println("SENDING", lastPayload.Data)
                             client.Conn.WriteMessage(websocket.BinaryMessage, lastPayload.Data)
                         }
                     }

                }
			}








			// for client, _ := range pool.Clients {
			// 	if err := client.Conn.WriteJSON(message); err != nil {
			// 		fmt.Println(err)
			// 		return
			// 	}
			// }
		}
	}
}
