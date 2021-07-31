import axios from "axios";

export async function graphqlQuery(query, variables, apiUrl="/graphql") {
	var response = await axios
		.post(apiUrl, {
			query: query,
			variables: variables
		}, { 
			headers: { 'Content-Type': 'application/json' }
		});
	return response.data.data;
}