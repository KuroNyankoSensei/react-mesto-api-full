class Api {
    constructor(headers, baseUrl) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _getResponse = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }

    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._getResponse(res))
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._getResponse(res))
    }

    postCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => this._getResponse(res))
    }

    patchInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => this._getResponse(res))
    }

    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._getResponse(res))
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._getResponse(res))
    }

    changeLikeCardStatus(id, isLiked) {
        const like = (isLiked ? 'PUT' : 'DELETE')
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: like,
            headers: this._headers
        })
            .then(res => this._getResponse(res))
    }

}

const api = new Api({
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
}, 'https://api.mesto.kuronyanko.nomoredomains.sbs')

export { api } 