SOURCE_DIR       := $(shell pwd)
BUILD_DIR        := ${SOURCE_DIR}/dist
NODE_MODULES_DIR := ${SOURCE_DIR}/node_modules

.PHONY: build all

build:
	yarn
	rm -rf $(BUILD_DIR)
	yarn build
	yarn copy

pack: build
	cd $(BUILD_DIR) && yarn pack

package: build
	yarn package 

publish: package
	cd $(BUILD_DIR)
	yarn publish 

test:
	yarn test --watchAll=false

clean:
	rm -rf $(BUILD_DIR) $(NODE_MODULES_DIR)
