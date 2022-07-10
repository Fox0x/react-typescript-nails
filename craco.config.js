const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#fdb1aa",
							"@component-background": "f8f8f8",
							"@text-color" : "#5a6c70",
							"@heading-color": "#5a6c70",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
