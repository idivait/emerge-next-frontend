export const is404 = (error) => /not found/i.test(error.message)
export const handleError = (error) => { console.error(error); throw error; }