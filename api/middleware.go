package api

import (
	"net/http"

	"github.com/google/uuid"
)

// withCORS adds the required CORS headers
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Request-Id")
		w.Header().Set("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

func withRequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		reqId := r.Header.Get("X-Request-Id")

		if r.Header.Get("X-Request-Id") == "" {
			reqId = uuid.NewString()
		}

		r = r.WithContext(requestIdWithContext(r.Context(), reqId))
		next.ServeHTTP(w, r)
	})
}
