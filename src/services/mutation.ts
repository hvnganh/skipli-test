export const generateAccessCode = (phoneNumber: number) => {
    return fetch('http://localhost:3001/verify', {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            phoneNumber
        })
    })
}

export const validateAccessCode = (accessCode: number, phoneNumber: number) => {
    return fetch('http://localhost:3001/check-verify', {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            accessCode,
            phoneNumber
        })
    })
}