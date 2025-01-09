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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const doctor_entity_1 = require("./doctor.entity");
const queue_entity_1 = require("./queue.entity");
const appointment_enum_1 = require("../enums/appointment.enum");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'app_id' }),
    __metadata("design:type", Number)
], Appointment.prototype, "app_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => queue_entity_1.Queue, patient => (patient.appointments), { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", Object)
], Appointment.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctor_entity_1.Doctor, doctor => (doctor.appointments), { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'doc_id' }),
    __metadata("design:type", Object)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'app_time',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Appointment.prototype, "app_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: appointment_enum_1.AppointmentStatus,
        default: appointment_enum_1.AppointmentStatus.Booked,
        name: 'app_status',
    }),
    __metadata("design:type", String)
], Appointment.prototype, "app_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Appointment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Appointment.prototype, "updated_at", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)('Appointments')
], Appointment);
//# sourceMappingURL=appointment.entity.js.map