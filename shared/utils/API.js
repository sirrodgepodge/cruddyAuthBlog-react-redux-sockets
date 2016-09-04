import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import pathJoin from './pathJoin';

// needed as absolute routes are needed until Node.js implements native fetch
const baseURL = process.env.CLIENT ? '' : process.env.BASE_URL || (`http://localhost:${process.env.PORT || 3000}`);

export default {
	makeRequest(o) {
		// error if no route is provided
		if (!o.route) return console.error("no 'route' property specified on request");

		// make relative routes absolute, isomorphism needs this until Node.js implements native fetch
		if (o.route.slice(0, 1) === '/') o.route = `${baseURL}${o.route}`;

		// provide default values
    o.params = o.params || [];
		o.headers = _.merge({
			Accept: "*/*",
			'Accept-Encoding': 'gzip, deflate, sdch',
			'Content-Type': !o.body || typeof o.body === 'string' ?
			'text/plain' :
			o.body instanceof Blob ?
			o.body.type :
			o.body instanceof FormData ?
			'multipart/form-data' :
			'application/json',
		}, o.headers || {});

		// transform query object into query string format, JSON-ifying contained objects
		o.query = o.query ? `?${Object.keys(o.query).map(val =>
			`${val}=${(o.query[val] && typeof o.query[val] === 'object'?
				JSON.stringify(o.query[val]) :
				o.query[val])}`).join("&")}` :
			"";

		const fullUrl = `${o.route}${pathJoin(o.params, '/')}${o.query}`;
		const res = {};
		const requestConfig = {
			credentials: !o.includeCreds ? 'include' : 'same-origin',
			method: o.method,
			headers: new Headers(o.headers), // 'Headers' is a new native global paired with 'fetch'

			// enables cors requests for absolute paths not beginning with current site's href
			//note that cookies can't be set with the response on cors requests
			mode: o.route.slice(0, 1)=== '/' || baseURL && o.route.indexOf(baseURL) === 0 ? 'same-origin' : 'cors'
		};

		// add given body property to requestConfig if not a GET or DELETE request
		if (o.body) {
			if (['get', 'delete'].indexOf(o.method) > -1)
				console.error('request body can not be sent on get or delete requests');
			else requestConfig.body = o.headers['Content-Type'] === 'application/json' && typeof o.body !== 'string' ?
				JSON.stringify(o.body) : // fetch expects stringified body jsons, not objects
				o.body;
		}


		return fetch(fullUrl, requestConfig)
      .then(unparsedRes => {
				const responseBodyContentType = unparsedRes.headers.get('Content-Type');

				// first add props other than body to response, then determine how to parse response
				return _.merge(res, _.omit(unparsedRes, 'body')),
					!unparsedRes.ok ?
					Promise.reject(new Error(`${o.method} \n ${fullUrl} \n ${res.status} (${res.statusText})`)) :
					!responseBodyContentType || responseBodyContentType.indexOf('text') > -1 ?
					unparsedRes.text() :
					responseBodyContentType.indexOf('json') > -1 ?
					unparsedRes.json() :
					responseBodyContentType.indexOf('form') > -1 ?
					unparsedRes.formData() :
					o.responseType === 'arrayBuffer' ? // allow user to specify arraybuffer vs blob, don't think you can actually determine difference as it seems like different ways to view same data
					unparsedRes.arrayBuffer :
					unparsedRes.blob();
			})
			.then(body => Promise.resolve(_.merge(res, {body})));
	},
	get(o) {
    if (typeof o === 'string') o = {route: o}; // if string is passed just use that as route
		o.method = 'get';
		return this.makeRequest(o);
	},
	del(o) {
    if (typeof o === 'string') o = {route: o}; // if string is passed just use that as route
		o.method = 'delete';
		return this.makeRequest(o);
	},
	post(o) {
    if (typeof o === 'string') o = {route: o}; // if string is passed just use that as route
		o.method = 'post';
		return this.makeRequest(o);
	},
	put(o) {
    if (typeof o === 'string') o = {route: o}; // if string is passed just use that as route
		o.method = 'put';
		return this.makeRequest(o);
	}
};
