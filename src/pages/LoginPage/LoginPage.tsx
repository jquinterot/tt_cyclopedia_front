function LoginPage() {
    return (
        <div className="bg-gray-800 min-h-screen flex flex-col items-center text-white">
            <form
                className="w-full max-w-md space-y-4 mt-20"
            >
                <h1 className="text-2xl font-bold">Sign in</h1>

                <div className="space-y-2">
                    <label className="block text-lg font-medium" htmlFor="username">
                        Username
                    </label>
                    <input

                        id="username"
                        className="w-full p-2 rounded border text-black"
                        type="text"
                    />

                    <label className="block text-lg font-medium" htmlFor="password">
                        Password
                    </label>
                    <input

                        id="password"
                        className="w-full p-2 rounded border text-black"
                        type="text"
                    />

                        <button
                            type="submit"
                            className="w-1/3 mt-4  mr-2 bg-green-800 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                            Sign in
                        </button>
        
                        <a href="/main" className="button w-1/3 bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"> Sign up</a>
                </div>
            </form>
        </div>
    )
}
export default LoginPage;