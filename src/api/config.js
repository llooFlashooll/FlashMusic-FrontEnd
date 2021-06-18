let api_base_url = ''

if (process.env.NODE_ENV === 'development') {
    // api_base_url = 'http://localhost:3000'
    api_base_url = "http://47.103.56.113:5000"
} else if (process.env.NODE_ENV === 'production') {
    api_base_url = 'http://47.103.56.113:5000/'
}

export default { api_base_url }