SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eux -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.SILENT:
.DEFAULT_GOAL := help

SILENT_SHELL := -eu -o pipefail -c

.PHONY: run
run:	## runs the web server
	python -m http.server -d src -b 127.0.0.1


dist/minipres.min.js: src/minipres.js
	mkdir -p dist/
	esbuild --minify $< --outfile=$@


dist/minipres.min.js.gz: dist/minipres.min.js
	gzip -9kf $<
	set +x
	ls -alh $@ | awk '{print "\n  \033[1;97m$@\033[0;36m  " $$5 "b\033[0m\n"}'


.PHONY: build
build: .SHELLFLAGS := $(SILENT_SHELL)
build:	## minify and compress minipres into dist/
	$(MAKE) dist/minipres.min.js.gz

##################################################### MAINTENANCE ######################################################
#region MAINTENANCE

.PHONY: clean
clean:	## cleans up the project, excluding the cached files
	rm -rf dist 


define AWK_MAKEHELP
BEGIN {
	FS = ":.*?## "
}

/^[a-z.A-Z_-]+:.*?## / {
	printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2
}
endef

.PHONY: help
help: .SHELLFLAGS := $(SILENT_SHELL)
help:  ## Display this help screen
	@echo -e "\033[1mAvailable commands:\033[0m"
	@awk '$(AWK_MAKEHELP)' $(MAKEFILE_LIST) \
		| sort

#endregion MAINTENANCE
