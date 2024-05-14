module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
    moduleNameMapper:{
        '^@/(.*)$': '<rootDir>/$1' // On dit à jest de transformer les imports de la forme "@/..." en "server/..."
    },
    transform: {
        '^.+\\.ts?$': 'ts-jest' // On dit à jest de transformer les fichiers .ts en utilisant ts-jest (en .js) pour les executer
    },
    testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)' // On dit à jest de chercher les fichiers de test qui se terminent par .spec.ts ou .test.ts (ou .js)
    ]
}
