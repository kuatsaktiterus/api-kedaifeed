"use strict";
const User = require('../models/User/User.model');
const Ability = require('../models/User/Ability.model');
const mongoose = require('mongoose');

class SaveAllPortoService {
    constructor (req) {
        this.req = req;
    }

    async saveAllPorto() {
        const user = await User.findById(this.req.params.id);
        const kdcwExps = Array.from(this.req.body.kdcw_experiences);
        const workExps = Array.from(this.req.body.work_experiences);
        const anotherPortos = Array.from(this.req.body.another_portos);
        const abilities = this.req.body.abilities;

        this.#pushKdcwExp(user, kdcwExps);
        this.#pushWorkExp(user, workExps);
        this.#pushAnotherPorto(user, anotherPortos);
        await this.pushAbility(user, abilities);
    }

    #pushKdcwExp(user, kdcwExps) {
        kdcwExps.map(async kdcwExp => {
            await user.updateOne({
                $push: {
                kdcw_experiences: {
                    position: kdcwExp.position,
                    start_of_period: kdcwExp.start_of_period,
                    end_of_period: kdcwExp.end_of_period,
                }
            }});
        });
    }

    #pushWorkExp(user, workExps) {
        workExps.map(async workExp => {
            await user.updateOne({
                $push: {
                    working_experiences: {
                        job: workExp.job,
                        start_of_period: workExp.start_of_period,
                        end_of_period: workExp.end_of_period,
                    }
                }
            });
        });
    }

    #pushAnotherPorto(user, anotherPortos) {
        anotherPortos.map(async anotherPorto => {
            await user.updateOne({
                $push: {
                    another_porto: {
                        portofolio: anotherPorto.portofolio
                    }
                }
            });
        });
    }

    async #pushAbility(user, abilities) {
        const { ability, id_ability} = abilities; 
        const savedIdAbilities = await Promise.all(this.#insertAbilitiesData(ability)).then(e => e.map(e => e._id));
        
        const getAbilityId = (await Promise.all(this.#getAbilityId(id_ability)).then(e => e.filter(e => e)));
        
        const abilityIds = (await Promise.all(getAbilityId)).concat(savedIdAbilities);

        abilityIds.map(async abilityId => {
            await user.updateOne({
                $push: {
                    abilities: abilityId
                }
            });
        });
    }

    #insertAbilitiesData(abilities) {
        abilities = Array.from(abilities);
        return abilities.map(async ability => {
            const newAbility = new Ability({
                name_of_ability: ability.name_of_ability
            });
            return await newAbility.save();
        });
    }

    #getAbilityId(abilities) {
        abilities = Array.from(abilities);
        return abilities.map(async ability => {
            const abilities = await Ability.aggregate([
                {$match: { _id: mongoose.Types.ObjectId(ability.id) }}
            ]);
            let idAbility;
            abilities.forEach(e => idAbility = e._id);
            return idAbility;
        });
    }
};

module.exports = SaveAllPortoService;