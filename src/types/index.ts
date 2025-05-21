export namespace BeraniSekolahTypes {
	export type RegisterPayload = {
		password_confirmation: string;
		password: string;
		birthday: string;
		birthplace: string;
		name: string;
		nik: string;
		nisn: string;
		email: string;
		graduation_year: number;
		school_origin: string;
	};

	export type ProfileResponse = {
		data: {
			ppdb_user: {
				id: string;
				users_id: string;
				name: string;
				nisn: string;
				nik: string;
				education?: string;
				school_origin: string;
				graduation_year: string;
				birthday: string;
				birthplace: string;
				gender?: string;
				email: string;
				phone?: string;
				phone_parent?: string;
				img_path?: string;
				img_url?: string;
				province?: string;
				city?: string;
				distrik?: string;
				sub_distrik?: string;
				rt?: string;
				rw?: string;
				address?: string;
				home_number?: string;
				lat?: number;
				lng?: number;
				coordinate_status: string;
				ppdb_track_id?: string;
				ppdb_track_status: string;
				is_special?: boolean;
				ppdb_special_quota_id?: string;
				ppdb_special_quota_name?: string;
				school_id?: string;
				school_name?: string;
				ppdb_registration_id?: string;
				date_registration?: string;
				point?: number;
				raport_value: number;
				rank_track: number;
				rank_max?: number;
				status_lulus?: string;
				status_reregistration: string;
				created_at: string;
				updated_at: string;
			};
			check_biodata: boolean;
			graduation_year: Array<string>;
			education: Array<string>;
		};
	};

	export type UpdateProfilePayload = {
		file_64: string;
		name: string;
		gender: string;
		birthplace: string;
		birthday: string;
		nisn: string;
		nik: string;
		education: string;
		school_origin: string;
		graduation_year: string;
		email: string;
		phone: string;
		phone_parent: string;
		city: string;
		distrik: string;
		sub_distrik: string;
		rt: string;
		rw: string;
		address: string;
		home_number: string;
		lat: number;
		lng: number;
		province: string;
	};

	export type OmittedProfilePayload = Omit<
		UpdateProfilePayload,
		| 'name'
		| 'nisn'
		| 'nik'
		| 'school_origin'
		| 'graduation_year'
		| 'birthday'
		| 'birthplace'
		| 'email'
	>;
	export type UpdateProfileResponse = {
		message: string;
		data: {
			progress: {
				profile: string;
				requirement: string;
				registration: string;
				status: string;
				track_status: string;
				ppdb_status: {
					registration: string;
					document: string;
					repair: string;
					announcement: string;
					reregistration: string;
					'empty-quota': string;
				};
			};
		};
	};

	export type UploadDocumentPayload = {
		file_64: string;
		key: string;
		type: string;
	};

	export type UpdateDocumentResponse = {
		data: {
			ppdb_user_id: string;
			general: string;
			id: string;
			updated_at: string;
			created_at: string;
		};
		message: string;
	};

	export type UpdateRequirementPayload = {
		semester_5: number;
		semester_4: number;
		semester_3: number;
		semester_2: number;
		semester_1: number;
		home_sign: string;
		track: string;
		agreement: string;
	};

	export type RegistrationSearchRsult = {
		data: {
			ppdb_user: {
				id: string;
				users_id: string;
				name: string;
				nisn: string;
				nik: string;
				education: string;
				school_origin: string;
				graduation_year: string;
				birthday: string;
				birthplace: string;
				gender: string;
				email: string;
				phone: string;
				phone_parent: string;
				img_path: string;
				img_url: string;
				province: string;
				city: string;
				distrik: string;
				sub_distrik: string;
				rt: string;
				rw: string;
				address: string;
				home_number: string;
				lat: string;
				lng: string;
				coordinate_status: string;
				ppdb_track_id: string;
				ppdb_track_status: string;
				status_lulus: string;
				status_reregistration: string;
				created_at: string;
				updated_at: string;
				ppdb_track: {
					id: number;
					name: string;
				};
			};
			school: Array<{
				id: string;
				name: string;
				npsn: string;
				latitude: string;
				grade: string;
				status: string;
				longitude: string;
				city_id: number;
				address: string;
				spmb_status: string;
				distance: number;
				school_websekolah?: {
					id: number;
					school_id: string;
					name: string;
					about: string;
					head_name: string;
					head_position: string;
					head_url: string;
					logo_url?: string;
					created_at: string;
					updated_at: string;
				};
				city: {
					id: number;
					name: string;
					created_at: string;
					updated_at: string;
				};
			}>;
			wilayah_administrasi: Record<
				string,
				Array<{
					id: number;
					ppdb_wilayah_administrasi_id: number;
					name: string;
					created_at: string;
					updated_at: string;
				}>
			>;
		};
	};

	export type UpdateRegistrationPayload = {
		school_id: string;
		school_name: string;
		wilayah_detail_id: string;
	};

	export type UpdateRegistrationResponse = {
		message: string;
		data: {
			user: {
				id: string;
				users_id: string;
				name: string;
				nisn: string;
				nik: string;
				education: string;
				school_origin: string;
				graduation_year: string;
				birthday: string;
				birthplace: string;
				gender: string;
				email: string;
				phone: string;
				phone_parent: string;
				img_path: string;
				img_url: string;
				province: string;
				city: string;
				distrik: string;
				sub_distrik: string;
				rt: string;
				rw: string;
				address: string;
				home_number: string;
				lat: string;
				lng: string;
				coordinate_status: string;
				ppdb_track_id: string;
				ppdb_track_status: string;
				school_id: string;
				school_name: string;
				ppdb_registration_id: string;
				date_registration: string;
				point: number;
				raport_value: number;
				status_lulus: string;
				status_reregistration: string;
				created_at: string;
				updated_at: string;
			};
			progress: {
				profile: string;
				requirement: string;
				registration: string;
				status: string;
				track_status: string;
				ppdb_status: {
					registration: string;
					document: string;
					repair: string;
					announcement: string;
					reregistration: string;
					'empty-quota': string;
				};
			};
		};
	};
}
