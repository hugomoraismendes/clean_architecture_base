import { BaseRepository, MixParameterStoreRepository } from '@adapters';

const ParameterStoreGateway = MixParameterStoreRepository(BaseRepository);

export default ParameterStoreGateway;
