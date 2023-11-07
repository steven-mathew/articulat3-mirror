package api

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
)

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
