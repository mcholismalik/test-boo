module.exports = {
	collectCoverage: true,
	collectCoverageFrom: [
    'src/usecase/**/*.js',
    'src/repository/**/*.js',
    'src/handler/**/*.js',
  ],
	coverageReporters: ['lcov', 'text'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
};