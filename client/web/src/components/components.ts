/**
 * These DS / Component imports will be replaced with an import from the local alpha design system.
 * We're just fixing something on our side to allow you to extend zero.
 */
import {allComponents, provideFASTDesignSystem} from '@microsoft/fast-components';
import {logger} from '../utils';

provideFASTDesignSystem().register(allComponents);

enum ResourceType {
  local = 'local',
  remote = 'remote',
}

function loadZeroFallback() {
  return import(
    /* webpackMode: "lazy" */
    '@genesislcap/foundation-zero'
  );
}

export const loadZeroDesignSystem = async () => {
  let type = ResourceType.remote;
  try {
    // @ts-ignore
    return await import('foundationZero/DesignSystem');
  } catch (e) {
    type = ResourceType.local;
    return await loadZeroFallback();
  } finally {
    logger.debug(`Using '${type}' version of foundationZero/DesignSystem`);
  }
};

/**
 * Load the wp5 module federation remote versions, or fallback to code split bundled versions.
 * You would really be targeting the client's design system, components etc here. For now just targeting zero.
 */
export const loadRemotes = async () => {
  const {registerZeroDesignSystem} = await loadZeroDesignSystem();
  return {
    ZeroDesignSystem: registerZeroDesignSystem(),
  };
};
