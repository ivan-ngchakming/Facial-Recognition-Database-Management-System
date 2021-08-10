import axios from "axios";

export async function graphqlQuery(query, variables, apiUrl="/graphql") {
	var response = await axios
		.post(apiUrl, {
			query: query,
			variables: variables
		}, { 
			headers: { 'Content-Type': 'application/json' }
		});
	if (response.data.data) {
		return response.data.data;
	}
	if (response.data.errors) {
		const errors = response.data.errors
		console.log(errors);
		for (let i = 0; i < errors.length; i++) {
			const error = errors[i];
			console.log(error)
			console.log(error.extensions.exception.stacktrace.join('\n'))
		}
		throw errors;
	}
}