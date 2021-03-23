SOURCE_DIR       := $(shell pwd)
BUILD_DIR        := ${SOURCE_DIR}/dist
NODE_MODULES_DIR := ${SOURCE_DIR}/node_modules

.PHONY: build all

build:
	yarn
	rm -rf $(BUILD_DIR)
	yarn run build
	yarn run copy

pack: build
	cd $(BUILD_DIR) 
	yarn pack

package: build
	yarn run package 
	yarn run copy

publish: package
	cd $(BUILD_DIR) 
	yarn run publish-public 
	
test:
	yarn test --watchAll=false

clean:
	rm -rf $(BUILD_DIR) $(NODE_MODULES_DIR)
