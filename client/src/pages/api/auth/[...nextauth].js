import NextAuth from 'next-auth'

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		// Providers.GitHub({
		//   clientId: process.env.GITHUB_ID,
		//   clientSecret: process.env.GITHUB_SECRET
		// }),
		// ...add more providers here
	]

	// A database is optional, but required to persist accounts in a database
	//   database: process.env.DATABASE_URL,
})
