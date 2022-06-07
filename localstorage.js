

function asyncLocalStorage() {

	set: async function()(key, value)
	{
		await null;
		return localStorage.setItem(key, value);
	},
	get: async function(key)
	{
		await null;
		return localStorage.getItem(key);
	}

};
