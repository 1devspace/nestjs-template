import type { UserConfig } from '@commitlint/types';

/**
 * ============================================================================
 * COMMITLINT CONFIGURATION
 * ============================================================================
 *
 * SETUP: Change PROJECT_KEY below to match your Jira project key
 *
 * REQUIRED COMMIT MESSAGE FORMAT:
 * ──────────────────────────────────────────────────────────────────────────
 *
 *   PROJECT_KEY-<ticket> <type>: <subject>
 *
 * ──────────────────────────────────────────────────────────────────────────
 *
 * EXAMPLES:
 *   ✅ PROJECT_KEY-326 feat: Add AI feedback module with endpoints and schema
 *   ✅ PROJECT_KEY-123 fix: Resolve authentication bug in login flow
 *   ✅ PROJECT_KEY-456 docs: Update API documentation for feedback endpoint
 *   ✅ PROJECT_KEY-789 refactor: Simplify user service logic
 *
 *   ❌ Add AI feedback module (missing ticket and type)
 *   ❌ PROJECT_KEY-326: Add feature (missing type)
 *   ❌ feat: Add feature (missing ticket number)
 *   ❌ PROJECT_KEY-326 feature: Add (invalid type - use 'feat' not 'feature')
 *
 * VALID TYPES:
 *   feat     - New feature
 *   fix      - Bug fix
 *   docs     - Documentation changes
 *   style    - Code style changes (formatting, no logic change)
 *   refactor - Code refactoring (no new feature, no bug fix)
 *   perf     - Performance improvements
 *   test     - Adding or updating tests
 *   chore    - Maintenance tasks
 *   ci       - CI/CD changes
 *   build    - Build system changes
 *   revert   - Reverting previous commits
 *
 * ============================================================================
 */

// ⚠️ CHANGE THIS to your Jira project key (e.g., 'MYAPP', 'PROJ', 'API')
const PROJECT_KEY = 'PROJECT_KEY';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // Pattern: PROJECT_KEY-123 type: message
      headerPattern: new RegExp(`^${PROJECT_KEY}-\\d+\\s+(\\w+):\\s*(.+)$`),
      headerCorrespondence: ['type', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-ticket-pattern': ({
          header,
        }: {
          header: string | null;
        }): [boolean, string] => {
          const pattern = new RegExp(
            `^${PROJECT_KEY}-\\d+\\s+(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert):\\s*.+$`,
          );
          const isValid = pattern.test(header || '');

          if (!isValid) {
            return [
              false,
              `\n
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMMIT MESSAGE FORMAT ERROR                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Required format:  ${PROJECT_KEY}-<ticket> <type>: <message>                       │
│                                                                             │
│  Example:          ${PROJECT_KEY}-326 feat: Add new feature                        │
│                                                                             │
│  Valid types:      feat | fix | docs | style | refactor | perf              │
│                    test | chore | ci | build | revert                       │
│                                                                             │
│  Your message:     ${(header || '').substring(0, 50).padEnd(50)}            │      
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
`,
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    // Custom rule to validate full pattern
    'header-match-ticket-pattern': [2, 'always'],
    // Validate type is one of allowed values
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
    'subject-max-length': [2, 'always', 200],
    'body-max-line-length': [0],
  },
};

export default config;
