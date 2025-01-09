"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("../entities/doctor.entity");
let DoctorService = class DoctorService {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    async create(createDoctorDto) {
        const doctor = this.doctorRepository.create(createDoctorDto);
        return this.doctorRepository.save(doctor);
    }
    async findOne(doc_id) {
        return this.doctorRepository.findOne({ where: { doc_id } });
    }
    async findAll(id, status, specialization, location, nextAvailable) {
        const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');
        if (id) {
            queryBuilder.andWhere('doctor.doc_id = :id', { id });
        }
        if (status) {
            queryBuilder.andWhere('doctor.doc_status = :status', { status });
        }
        if (specialization) {
            queryBuilder.andWhere('doctor.specialization LIKE :specialization', { specialization: `%${specialization}%` });
        }
        if (location) {
            queryBuilder.andWhere('doctor.location LIKE :location', { location: `%${location}%` });
        }
        if (nextAvailable) {
            queryBuilder.andWhere('doctor.next_available <= :nextAvailable', { nextAvailable });
        }
        return queryBuilder.getMany();
    }
    async update(doc_id, updateDoctorDto) {
        await this.doctorRepository.update(doc_id, updateDoctorDto);
        return this.findOne(doc_id);
    }
    async remove(id) {
        await this.doctorRepository.delete(id);
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map