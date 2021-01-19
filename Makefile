$ LANG = Javascript

webpack_config := webpack.config.js

.PHONY: prod dev

prod:
	@npx wp --config.build ${webpack_config}

dev:
	@npx wp --config.serve ${webpack_config}
