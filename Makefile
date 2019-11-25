SOURCE_DIR       := $(shell pwd)
BUILD_DIR        := ${SOURCE_DIR}/dist
NODE_MODULES_DIR := ${SOURCE_DIR}/node_modules

.PHONY: build all

build:
	yarn
	yarn build
	yarn copy

pack: build
	cd dist/ && yarn pack

test:
	yarn test --watchAll=false

clean:
	rm -rf $(BUILD_DIR) $(NODE_MODULES_DIR)
