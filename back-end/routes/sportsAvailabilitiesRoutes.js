import {Router} from 'express';
const router = Router();
import {getAllSportsAvailabilities, getSportsAvailabilitiesByEntity, getSportsAvailabilitiesById, updateSportsAvailabilities, createSportsAvailabilities, deleteSportsAvailabilities } from '../controllers/sportsAvailabilitiesControllers.js';

router.get('/', getAllSportsAvailabilities);

router.get('/:id', getSportsAvailabilitiesByEntity);

router.get('/sport-availability/:id', getSportsAvailabilitiesById);

router.put('/', updateSportsAvailabilities);

router.post('/', createSportsAvailabilities);

router.delete('/:sports_id/:sports_entity_id', deleteSportsAvailabilities);

export default router;  