export default {
	content: {
		menuLinks: {
			authenticated: {
				links: [
					{ title: "Add Grocery", path: "/add-grocery-item" },
					{ title: "Dishes", path: "/dishes" },
				],
				routes: [
					{ path: "/add-grocery-item", component: "AddGroceryForm" },
					{ path: "/dishes", component: "Dishes" },
				],
			},
			anonymous: {
				links: [
					{ title: "Register", path: "/register" },
					{ title: "Login", path: "/login" },
				],
				routes: [
					{ path: "/register", component: "RegistrationForm" },
					{ path: "/login", component: "Login" },
				],
			},
		},
	},
	titles: { titles: [], search_results: [], dishes: [] },
};
