package api

import (
	"articulate/internal/websocket"
	"fmt"
	"net/http"

	gws "github.com/gorilla/websocket"
)

var (
	upgrader = gws.Upgrader{
		CheckOrigin: func(*http.Request) bool { return true },
	}
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	query := r.URL.Query()

	// FIXME: prone to clients flooding with many client-id or just
	// peering into a specific client-id
	cid := query.Get("client-id")
	if cid == "" {
		conn.Close()
		return
	}

	client := &websocket.Client{
		ID:   cid,
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}
