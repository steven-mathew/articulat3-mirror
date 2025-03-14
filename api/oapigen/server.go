// Package oapigen provides primitives to interact with the openapi HTTP API.
//
// Code generated by unknown module path version unknown version DO NOT EDIT.
package oapigen

import (
	"bytes"
	"compress/gzip"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/go-chi/chi/v5"
	"github.com/oapi-codegen/runtime"
)

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// Create a blob
	// (POST /v1/blobs)
	CreateBlob(w http.ResponseWriter, r *http.Request)
	// Retrieve a blob
	// (GET /v1/blobs/{id})
	GetBlob(w http.ResponseWriter, r *http.Request, id string)
	// Retrieve all PromptIntents
	// (GET /v1/prompt_intents)
	GetPromptIntents(w http.ResponseWriter, r *http.Request, params GetPromptIntentsParams)
	// Create a PromptIntent object.
	// (POST /v1/prompt_intents)
	CreatePromptIntent(w http.ResponseWriter, r *http.Request)
	// Retrieve a PromptIntent
	// (GET /v1/prompt_intents/{id})
	GetPromptIntent(w http.ResponseWriter, r *http.Request, id string)
}

// Unimplemented server implementation that returns http.StatusNotImplemented for each endpoint.

type Unimplemented struct{}

// Create a blob
// (POST /v1/blobs)
func (_ Unimplemented) CreateBlob(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotImplemented)
}

// Retrieve a blob
// (GET /v1/blobs/{id})
func (_ Unimplemented) GetBlob(w http.ResponseWriter, r *http.Request, id string) {
	w.WriteHeader(http.StatusNotImplemented)
}

// Retrieve all PromptIntents
// (GET /v1/prompt_intents)
func (_ Unimplemented) GetPromptIntents(w http.ResponseWriter, r *http.Request, params GetPromptIntentsParams) {
	w.WriteHeader(http.StatusNotImplemented)
}

// Create a PromptIntent object.
// (POST /v1/prompt_intents)
func (_ Unimplemented) CreatePromptIntent(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotImplemented)
}

// Retrieve a PromptIntent
// (GET /v1/prompt_intents/{id})
func (_ Unimplemented) GetPromptIntent(w http.ResponseWriter, r *http.Request, id string) {
	w.WriteHeader(http.StatusNotImplemented)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandlerFunc   func(w http.ResponseWriter, r *http.Request, err error)
}

type MiddlewareFunc func(http.Handler) http.Handler

// CreateBlob operation middleware
func (siw *ServerInterfaceWrapper) CreateBlob(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	handler := http.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		siw.Handler.CreateBlob(w, r)
	}))

	for _, middleware := range siw.HandlerMiddlewares {
		handler = middleware(handler)
	}

	handler.ServeHTTP(w, r.WithContext(ctx))
}

// GetBlob operation middleware
func (siw *ServerInterfaceWrapper) GetBlob(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var err error

	// ------------- Path parameter "id" -------------
	var id string

	err = runtime.BindStyledParameterWithLocation("simple", false, "id", runtime.ParamLocationPath, chi.URLParam(r, "id"), &id)
	if err != nil {
		siw.ErrorHandlerFunc(w, r, &InvalidParamFormatError{ParamName: "id", Err: err})
		return
	}

	handler := http.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		siw.Handler.GetBlob(w, r, id)
	}))

	for _, middleware := range siw.HandlerMiddlewares {
		handler = middleware(handler)
	}

	handler.ServeHTTP(w, r.WithContext(ctx))
}

// GetPromptIntents operation middleware
func (siw *ServerInterfaceWrapper) GetPromptIntents(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetPromptIntentsParams

	// ------------- Optional query parameter "page" -------------

	err = runtime.BindQueryParameter("form", true, false, "page", r.URL.Query(), &params.Page)
	if err != nil {
		siw.ErrorHandlerFunc(w, r, &InvalidParamFormatError{ParamName: "page", Err: err})
		return
	}

	// ------------- Optional query parameter "limit" -------------

	err = runtime.BindQueryParameter("form", true, false, "limit", r.URL.Query(), &params.Limit)
	if err != nil {
		siw.ErrorHandlerFunc(w, r, &InvalidParamFormatError{ParamName: "limit", Err: err})
		return
	}

	handler := http.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		siw.Handler.GetPromptIntents(w, r, params)
	}))

	for _, middleware := range siw.HandlerMiddlewares {
		handler = middleware(handler)
	}

	handler.ServeHTTP(w, r.WithContext(ctx))
}

// CreatePromptIntent operation middleware
func (siw *ServerInterfaceWrapper) CreatePromptIntent(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	handler := http.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		siw.Handler.CreatePromptIntent(w, r)
	}))

	for _, middleware := range siw.HandlerMiddlewares {
		handler = middleware(handler)
	}

	handler.ServeHTTP(w, r.WithContext(ctx))
}

// GetPromptIntent operation middleware
func (siw *ServerInterfaceWrapper) GetPromptIntent(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var err error

	// ------------- Path parameter "id" -------------
	var id string

	err = runtime.BindStyledParameterWithLocation("simple", false, "id", runtime.ParamLocationPath, chi.URLParam(r, "id"), &id)
	if err != nil {
		siw.ErrorHandlerFunc(w, r, &InvalidParamFormatError{ParamName: "id", Err: err})
		return
	}

	handler := http.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		siw.Handler.GetPromptIntent(w, r, id)
	}))

	for _, middleware := range siw.HandlerMiddlewares {
		handler = middleware(handler)
	}

	handler.ServeHTTP(w, r.WithContext(ctx))
}

type UnescapedCookieParamError struct {
	ParamName string
	Err       error
}

func (e *UnescapedCookieParamError) Error() string {
	return fmt.Sprintf("error unescaping cookie parameter '%s'", e.ParamName)
}

func (e *UnescapedCookieParamError) Unwrap() error {
	return e.Err
}

type UnmarshalingParamError struct {
	ParamName string
	Err       error
}

func (e *UnmarshalingParamError) Error() string {
	return fmt.Sprintf("Error unmarshaling parameter %s as JSON: %s", e.ParamName, e.Err.Error())
}

func (e *UnmarshalingParamError) Unwrap() error {
	return e.Err
}

type RequiredParamError struct {
	ParamName string
}

func (e *RequiredParamError) Error() string {
	return fmt.Sprintf("Query argument %s is required, but not found", e.ParamName)
}

type RequiredHeaderError struct {
	ParamName string
	Err       error
}

func (e *RequiredHeaderError) Error() string {
	return fmt.Sprintf("Header parameter %s is required, but not found", e.ParamName)
}

func (e *RequiredHeaderError) Unwrap() error {
	return e.Err
}

type InvalidParamFormatError struct {
	ParamName string
	Err       error
}

func (e *InvalidParamFormatError) Error() string {
	return fmt.Sprintf("Invalid format for parameter %s: %s", e.ParamName, e.Err.Error())
}

func (e *InvalidParamFormatError) Unwrap() error {
	return e.Err
}

type TooManyValuesForParamError struct {
	ParamName string
	Count     int
}

func (e *TooManyValuesForParamError) Error() string {
	return fmt.Sprintf("Expected one value for %s, got %d", e.ParamName, e.Count)
}

// Handler creates http.Handler with routing matching OpenAPI spec.
func Handler(si ServerInterface) http.Handler {
	return HandlerWithOptions(si, ChiServerOptions{})
}

type ChiServerOptions struct {
	BaseURL          string
	BaseRouter       chi.Router
	Middlewares      []MiddlewareFunc
	ErrorHandlerFunc func(w http.ResponseWriter, r *http.Request, err error)
}

// HandlerFromMux creates http.Handler with routing matching OpenAPI spec based on the provided mux.
func HandlerFromMux(si ServerInterface, r chi.Router) http.Handler {
	return HandlerWithOptions(si, ChiServerOptions{
		BaseRouter: r,
	})
}

func HandlerFromMuxWithBaseURL(si ServerInterface, r chi.Router, baseURL string) http.Handler {
	return HandlerWithOptions(si, ChiServerOptions{
		BaseURL:    baseURL,
		BaseRouter: r,
	})
}

// HandlerWithOptions creates http.Handler with additional options
func HandlerWithOptions(si ServerInterface, options ChiServerOptions) http.Handler {
	r := options.BaseRouter

	if r == nil {
		r = chi.NewRouter()
	}
	if options.ErrorHandlerFunc == nil {
		options.ErrorHandlerFunc = func(w http.ResponseWriter, r *http.Request, err error) {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
	}
	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandlerFunc:   options.ErrorHandlerFunc,
	}

	r.Group(func(r chi.Router) {
		r.Post(options.BaseURL+"/v1/blobs", wrapper.CreateBlob)
	})
	r.Group(func(r chi.Router) {
		r.Get(options.BaseURL+"/v1/blobs/{id}", wrapper.GetBlob)
	})
	r.Group(func(r chi.Router) {
		r.Get(options.BaseURL+"/v1/prompt_intents", wrapper.GetPromptIntents)
	})
	r.Group(func(r chi.Router) {
		r.Post(options.BaseURL+"/v1/prompt_intents", wrapper.CreatePromptIntent)
	})
	r.Group(func(r chi.Router) {
		r.Get(options.BaseURL+"/v1/prompt_intents/{id}", wrapper.GetPromptIntent)
	})

	return r
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"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",
	"AAD//8eAxcm3IQAA",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
