package api

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
)

// withCORS adds the required CORS headers
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
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
		reqID, err := uuid.NewUUID()
		if err != nil {
			log.Err(err).Msgf("error generating uuid")
			return
		}

		r = r.WithContext(requestIdWithContext(r.Context(), reqID.String()))
		next.ServeHTTP(w, r)
	})
}
