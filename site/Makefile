PORTS ?= -p 8000
NETWORK ?= host
IMAGE := fleek/gatsby:node-10
RUN ?= docker run --init --rm -it $(PORTS) \
		-w /work \
		-v $$(pwd):/work \
		--net=$(NETWORK) \
		$(IMAGE)

install:
	$(RUN) yarn install

develop:
	$(RUN) gatsby develop

clean:
	$(RUN) gatsby clean

build:
	$(RUN) gatsby build

compress:
	$(RUN) tar -czf static-site.tgz public

interact:
	$(RUN) bash