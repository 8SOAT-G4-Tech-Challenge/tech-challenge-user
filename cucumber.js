module.exports = {
	default: {
		requireModule: [
			'ts-node/register',
			'tsconfig-paths/register',
		],
		roots: ['<rootDir>/__tests__', '<rootDir>/src'],
		require: ['__tests__/bdd/**/*.ts', '__tests__/bdd/**/*.ts'],
		paths: ['__tests__/bdd/**/*.feature'],
		format: ['progress-bar', 'html:cucumber-report.html'],
		moduleNameMapper: {
			'@src/(.*)': ['<rootDir>/src/$1'],
			'@driver/(.*)': ['<rootDir>/src/adapter/driver/$1'],
			'@driven/(.*)': ['<rootDir>/src/adapter/driven/$1'],
			'@models/(.*)': ['<rootDir>/src/core/domain/models/$1'],
			'@routes/(.*)': ['<rootDir>/src/adapter/driver/routes/$1'],
			'@exceptions/(.*)': ['<rootDir>/src/core/application/exceptions/$1'],
			'@controllers/(.*)': ['<rootDir>/src/adapter/driver/controllers/$1'],
			'@services/(.*)': ['<rootDir>/src/core/application/services/$1'],
			'@ports/(.*)': ['<rootDir>/src/core/application/ports/$1'],
			'@application/(.*)': ['<rootDir>/src/core/application/$1'],
			'@domain/(.*)': ['<rootDir>/src/core/domain/$1'],
			'@common/(.*)': ['<rootDir>/src/core/common/$1'],
		},
	},
};
