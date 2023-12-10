package websocket

import (
	"sync"

	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex

    WorkflowId string
}

type Message struct {
    ID string
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Err(err).Msg("Failed to read message")
			return
		}

        message := Message{ID: c.ID, Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message
	}
}
