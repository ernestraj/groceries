export default {
	content: {
		menuLinks: {
			authenticated: {
				links: [
					{ title: "Add Grocery", path: "/add-grocery-item" },
					{ title: "Dishes", path: "/dishes" },
				],
				routes: ["/dishes", "/add-grocery-item", "/search"],
			},
			anonymous: {
				links: [
					{ title: "Register", path: "/register" },
					{ title: "Login", path: "/login" },
				],
				routes: ["/login", "/register"],
			},
		},
	},
	titles: { titles: [], search_results: [], dishes: [] },
	register: {
		error: null,
		progress: null,
		authenticated: "anonymous",
		tokenError: null,
	},
};
