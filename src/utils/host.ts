import config from '../../config.json'

export default function host() {
  let hostString = ''
  switch (config.environment) {
    case 'development':
      hostString = config['dev-host']
      break

    case 'test':
      hostString = config['test-host']
      break

    case 'qa':
      hostString = config['qa-host']
      break

    case 'staging':
      hostString = config['staging-host']
      break
  }

  return hostString
}
