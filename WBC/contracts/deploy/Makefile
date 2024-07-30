include .env

GREEN := $(shell tput -Txterm setaf 2)
BLUE := $(shell tput -Txterm setaf 4)
RESET := $(shell tput -Txterm sgr0)

deploy:
	@echo "$(BLUE)Deploying contract to network...$(RESET)" && \
	node deploy.ts && \
	@echo "$(GREEN)Contract deployed!$(RESET)"

solc:
	docker run -v `pwd/..`:/workspace -w /workspace ethereum/solc:0.8.26-alpine -o /workspace/build --abi --bin --overwrite --optimize /workspace/CompanyFactory.sol \
	&& docker run -v `pwd/..`:/workspace -w /workspace ethereum/solc:0.8.26-alpine -o /workspace/build --abi --bin --overwrite --optimize /workspace/Company.sol \