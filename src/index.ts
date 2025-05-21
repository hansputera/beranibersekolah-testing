import { fakerID_ID } from '@faker-js/faker';
import { BeraniBersekolah } from './lib/beranibersekolah.js';
import dayjs from 'dayjs';
import { getRandom } from './utils/random.js';
import got from 'got';

const berani = new BeraniBersekolah();

const payload = {
	birthday: dayjs(fakerID_ID.date.birthdate({ mode: 'year', min: 2009, max: 2012 })).format(
		'YYYY-MM-DD',
	),
	birthplace: fakerID_ID.location.city(),
	email: fakerID_ID.internet.email(),
	graduation_year: 2025,
	nik: fakerID_ID.string.numeric(16),
	nisn: fakerID_ID.string.numeric(10),
	name: fakerID_ID.person.fullName(),
	school_origin: fakerID_ID.person.firstName(),
	password: fakerID_ID.string
		.alphanumeric({ length: 10, casing: 'mixed' })
		.concat(fakerID_ID.string.symbol(10)),
};

const yah = await berani.register(payload);
console.log(`${payload.nisn} dengan password ${payload.password} berhasil terdaftar`);
console.log('Tokennya jwt', yah.token);

const peh = await berani.login(payload.nisn, payload.password);
if (peh) {
	console.log('Login berhasil');
	const fileUrl = fakerID_ID.image.url({
		width: 200,
		height: 200,
	});
	const responseInBufferImg = await got(fileUrl).buffer();

	const responsePdf = await got
		.post('https://www.fakefilegenerator.com/download.php', {
			form: {
				filetype: 'pdf',
				filename: 'apasigh',
				filesize: 500000,
			},
		})
		.buffer();

	const puy = await peh.updateProfile({
		address: fakerID_ID.location.streetAddress(),
		city: fakerID_ID.location.city(),
		distrik: fakerID_ID.location.state(),
		sub_distrik: fakerID_ID.location.state(),
		education: getRandom(['SMA', 'MTS']),
		gender: getRandom(['Laki-laki', 'Perempuan']),
		phone: fakerID_ID.phone.number({ style: 'international' }).replace('+62', '0'),
		phone_parent: fakerID_ID.phone.number({ style: 'international' }).replace('+62', '0'),
		home_number: fakerID_ID.location.buildingNumber(),
		rt: fakerID_ID.string.numeric({ length: 3 }),
		rw: fakerID_ID.string.numeric({ length: 3 }),
		province: fakerID_ID.location.state(),
		lat: fakerID_ID.location.latitude(),
		lng: fakerID_ID.location.longitude(),
		file_64: `data:image/jpeg;base64,${responseInBufferImg.toString('base64')}`,
	});

	console.log('Profile', puy.progress);

	const documents = await Promise.all([
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'ijazah',
			type: 'general',
		}),
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'akta_kelahiran',
			type: 'general',
		}),
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'ktp_wali',
			type: 'general',
		}),
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'kartu_keluarga',
			type: 'general',
		}),
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'stjm',
			type: 'general',
		}),
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'raport',
			type: 'general',
		}),
		peh.uploadDocument({
			file_64: `data:application/pdf;base64,${responsePdf.toString('base64')}`,
			key: 'sertifikat',
			type: 'prestasi',
		}),
	]);

	console.log('Docs', documents.length, 'documents succeess');

	const requirmeent = await peh.updateRequirement({
		agreement: 'true',
		home_sign: '',
		semester_1: fakerID_ID.number.int({ min: 80, max: 95 }),
		semester_2: fakerID_ID.number.int({ min: 80, max: 95 }),
		semester_3: fakerID_ID.number.int({ min: 80, max: 95 }),
		semester_4: fakerID_ID.number.int({ min: 80, max: 95 }),
		semester_5: fakerID_ID.number.int({ min: 80, max: 95 }),
		track: 'Jalur Prestasi',
	});
	console.log('Req', requirmeent);

	const regs = await peh.getRegistration();
	const randomSchool = getRandom(regs.school);

	console.log('Registering to', randomSchool.name);
	const resultschool = await peh.updateRegistration({
		school_id: randomSchool.id,
		school_name: randomSchool.name,
		wilayah_detail_id: '',
	});

	console.log(
		`${resultschool.user.nisn} dengan nama ${resultschool.user.name} berhasil mendaftar ke sekolah ${resultschool.user.school_name} dengan nomor ${resultschool.user.ppdb_registration_id}`,
	);
}
