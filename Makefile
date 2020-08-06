PORTS ?= -p 8000
NETWORK ?= host
IMAGE := dragonflyscience/data-beers-gatsby-s3:1.0
RUN ?= docker run --init --rm -it $(PORTS) \
		-w /work \
		-v $$(pwd):/work \
		--net=$(NETWORK) \
		$(IMAGE)

docker-build:
	docker build -t $(IMAGE) .
docker-push:
	docker push $(IMAGE)
docker: docker-build docker-push

install:
	(cd site && $(RUN) yarn install)

develop:
	(cd site && $(RUN) gatsby develop)

clean:
	(cd site && $(RUN) gatsby clean)

build:
	(cd site && $(RUN) gatsby build)

compress:
	(cd site && $(RUN) tar -czf static-site.tgz public)

interact:
	$(RUN) bash