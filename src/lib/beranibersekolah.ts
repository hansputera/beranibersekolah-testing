import type { BeraniSekolahTypes } from '@/types/index.js';
import got, { type Got } from 'got';
import NodeCache from 'node-cache';

const cache = new NodeCache();

export class BeraniBersekolahUser {
	protected serviceHttp: Got;

	constructor(token: string) {
		this.serviceHttp = got.extend({
			prefixUrl: 'https://service.spmb.sekolahkukeren.id/',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	public async fetchProfile(): Promise<BeraniSekolahTypes.ProfileResponse['data']> {
		const response = await this.serviceHttp
			.get('./api/ppdb_user/v1/profile')
			.json<BeraniSekolahTypes.ProfileResponse>();
		return response.data;
	}

	public async updateRegistration(args: BeraniSekolahTypes.UpdateRegistrationPayload) {
		const response = await this.serviceHttp
			.post('./api/ppdb_user/v1/registration', {
				json: args,
			})
			.json<BeraniSekolahTypes.UpdateRegistrationResponse>();
		return response.data;
	}

	public async getRegistration() {
		return this.serviceHttp
			.get('./api/ppdb_user/v1/registration?search=')
			.json<BeraniSekolahTypes.RegistrationSearchRsult>()
			.then((x) => x.data);
	}

	public async updateRequirement(args: BeraniSekolahTypes.UpdateRequirementPayload) {
		const response = await this.serviceHttp
			.post('./api/ppdb_user/v1/requirement', {
				json: args,
			})
			.json();

		return response;
	}

	public async uploadDocument(
		args: BeraniSekolahTypes.UploadDocumentPayload,
	): Promise<BeraniSekolahTypes.UpdateDocumentResponse['data']> {
		const response = await this.serviceHttp
			.post('./api/ppdb_user/v1/requirement/upload', {
				json: args,
			})
			.json<BeraniSekolahTypes.UpdateDocumentResponse>();

		return response.data;
	}

	public async updateProfile(
		args: BeraniSekolahTypes.OmittedProfilePayload,
	): Promise<BeraniSekolahTypes.UpdateProfileResponse['data']> {
		const profile = await this.fetchProfile();
		if (!profile) {
			throw new Error('Profile undefined?');
		}

		const payload: BeraniSekolahTypes.UpdateProfilePayload = {
			...profile.ppdb_user,
			...args,
		};

		const response = await this.serviceHttp
			.post('./api/ppdb_user/v1/profile', {
				json: payload,
				throwHttpErrors: false,
			})
			.json<BeraniSekolahTypes.UpdateProfileResponse>();

		if (!response.data) {
			throw new Error(response.message);
		}

		return response.data;
	}
}

export class BeraniBersekolah {
	protected gatewayHttp = got.extend({
		prefixUrl: 'https://gateway.spmb.sekolahkukeren.id',
	});

	public async login(username: string, password: string) {
		const response = await this.gatewayHttp
			.post('./api/login', {
				json: {
					username,
					password,
				},
				throwHttpErrors: false,
			})
			.json<{
				data?: {
					token: string;
				};
			}>();

		if (!response.data) {
			return undefined;
		}

		return new BeraniBersekolahUser(response.data.token);
	}

	public async register(args: Omit<BeraniSekolahTypes.RegisterPayload, 'password_confirmation'>) {
		const payload: BeraniSekolahTypes.RegisterPayload = {
			...args,
			password_confirmation: args.password,
		};

		const response = await this.gatewayHttp
			.post('./api/register', {
				json: payload,
				throwHttpErrors: false,
			})
			.json<{
				form?: Record<string, string[]>;
				message: string;
				token?: string;
			}>();

		if (!(response.token || response.form)) {
			throw new Error('Too many requests I guess');
		}

		if (response.form) {
			const messages = Object.values(response.form).map((m) => m.at(0));
			throw new Error(messages.join(', '));
		}

		return response;
	}
}
