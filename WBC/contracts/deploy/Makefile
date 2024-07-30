include .env

GREEN := $(shell tput -Txterm setaf 2)
BLUE := $(shell tput -Txterm setaf 4)
RESET := $(shell tput -Txterm sgr0)

CURRENT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname $(CURRENT_DIR))

deploy:
	@echo "$(BLUE)Deploying contract to network...$(RESET)" && \
	node deploy.ts && \
	@echo "$(GREEN)Contract deployed!$(RESET)"

solc:
	echo $(CURRENT_DIR) && \
	echo $(PARENT_DIR) && \
	docker run -v $(PARENT_DIR):/workspace -w /workspace ethereum/solc:0.8.26-alpine -o /workspace/build --abi --bin --overwrite --optimize /workspace/CompanyFactory.sol \
	&& docker run -v $(PARENT_DIR):/workspace -w /workspace ethereum/solc:0.8.26-alpine -o /workspace/build --abi --bin --overwrite --optimize /workspace/Company.sol \