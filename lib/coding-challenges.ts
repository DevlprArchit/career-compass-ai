export interface TestCase {
  input: string;
  expected: string;
  args?: any[];
  expectedValue?: any;
  isPrivate?: boolean;
}

export interface CodingChallenge {
  id: string;
  title: string;
  shortTitle: string;
  tradeTrack: "all" | "ai-ml" | "fullstack" | "data-science" | "cloud-devops";
  difficulty: "Easy" | "Medium";
  category: string;
  timeLimitMinutes: number;
  functionName: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: string;
  testCases: TestCase[];
  referenceSolution: string;
  hints: string[];
}

export const CODING_CHALLENGES: CodingChallenge[] = [
  // =========================================================================
  // 1. PYTHON SYNTAX & TOKENS (AI / ML & GENERAL)
  // =========================================================================
  {
    id: "valid-identifier",
    title: "1. Python Valid Identifier Checker",
    shortTitle: "Valid Identifier",
    tradeTrack: "all",
    difficulty: "Easy",
    category: "Python Lexical Grammar",
    timeLimitMinutes: 15,
    functionName: "is_valid_identifier",
    description: `In Python, an identifier is a name used to identify a variable, function, class, or module.
An identifier must obey these lexical rules:
1. It must start with a letter (a-z, A-Z) or an underscore (_).
2. It cannot start with a digit (0-9).
3. It can only contain alphanumeric characters and underscores (a-z, A-Z, 0-9, _).
4. It cannot be a reserved Python keyword (such as 'def', 'class', 'if', 'return', 'import', 'while', 'for').

Write a function \`is_valid_identifier(s: str) -> bool\` that takes a string \`s\` and returns \`True\` if it is a valid Python identifier and not a keyword, or \`False\` otherwise.`,
    constraints: [
      "1 <= len(s) <= 50",
      "String s consists of printable ASCII characters",
      "Treat all standard 35 Python keywords as reserved"
    ],
    examples: [
      {
        input: 'is_valid_identifier("user_name")',
        output: "True",
        explanation: "Starts with a letter and contains only letters and underscores."
      },
      {
        input: 'is_valid_identifier("2nd_player")',
        output: "False",
        explanation: "Cannot start with a numeric digit."
      },
      {
        input: 'is_valid_identifier("def")',
        output: "False",
        explanation: "'def' is a reserved Python keyword."
      }
    ],
    starterCode: `def is_valid_identifier(s: str) -> bool:
    # Reserved Python keywords
    KEYWORDS = {
        "False", "None", "True", "and", "as", "assert", "async", "await", 
        "break", "class", "continue", "def", "del", "elif", "else", "except", 
        "finally", "for", "from", "global", "if", "import", "in", "is", 
        "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", 
        "while", "with", "yield"
    }
    
    # Write your solution below:
    if not s or s in KEYWORDS:
        return False
    if not (s[0].isalpha() or s[0] == '_'):
        return False
    for ch in s[1:]:
        if not (ch.isalnum() or ch == '_'):
            return False
    return True
`,
    testCases: [
      { input: 'is_valid_identifier("user_name")', expected: "True", args: ["user_name"], expectedValue: true },
      { input: 'is_valid_identifier("2nd_player")', expected: "False", args: ["2nd_player"], expectedValue: false },
      { input: 'is_valid_identifier("def")', expected: "False", args: ["def"], expectedValue: false },
      { input: 'is_valid_identifier("_private_var")', expected: "True", args: ["_private_var"], expectedValue: true },
      { input: 'is_valid_identifier("total$sum")', expected: "False", args: ["total$sum"], expectedValue: false },
      { input: 'is_valid_identifier("class")', expected: "False", args: ["class"], expectedValue: false }
    ],
    referenceSolution: `def is_valid_identifier(s: str) -> bool:
    KEYWORDS = {
        "False", "None", "True", "and", "as", "assert", "async", "await", 
        "break", "class", "continue", "def", "del", "elif", "else", "except", 
        "finally", "for", "from", "global", "if", "import", "in", "is", 
        "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", 
        "while", "with", "yield"
    }
    return bool(s and s.isidentifier() and s not in KEYWORDS)`,
    hints: [
      "Check if the string is in the KEYWORDS set first for O(1) keyword detection.",
      "Check s[0] for alphabetical or underscore character.",
      "Ensure all remaining characters in s[1:] are alphanumeric or underscore."
    ]
  },

  // =========================================================================
  // 2. DATA STRUCTURES: TWO SUM HASHMAP (CORE DSA)
  // =========================================================================
  {
    id: "two-sum-target",
    title: "2. Two Sum Target Indices (O(N) Hash Map)",
    shortTitle: "Two Sum Target",
    tradeTrack: "all",
    difficulty: "Easy",
    category: "Data Structures & HashMaps",
    timeLimitMinutes: 20,
    functionName: "two_sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.
Assume that each input would have exactly one solution, and you may not use the same element twice.
You should achieve an O(N) time complexity using a dictionary or hash map.`,
    constraints: [
      "2 <= len(nums) <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: 'two_sum([2, 7, 11, 15], 9)',
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, return [0, 1]."
      },
      {
        input: 'two_sum([3, 2, 4], 6)',
        output: "[1, 2]",
        explanation: "Because nums[1] + nums[2] == 6, return [1, 2]."
      }
    ],
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []
`,
    testCases: [
      { input: "two_sum([2, 7, 11, 15], 9)", expected: "[0,1]", args: [[2, 7, 11, 15], 9] },
      { input: "two_sum([3, 2, 4], 6)", expected: "[1,2]", args: [[3, 2, 4], 6] },
      { input: "two_sum([3, 3], 6)", expected: "[0,1]", args: [[3, 3], 6] },
      { input: "two_sum([1, 5, 8, 12, 19], 20)", expected: "[0,4]", args: [[1, 5, 8, 12, 19], 20] }
    ],
    referenceSolution: `def two_sum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for idx, val in enumerate(nums):
        complement = target - val
        if complement in lookup:
            return [lookup[complement], idx]
        lookup[val] = idx
    return []`,
    hints: [
      "Use a hash map to store previously seen numbers and their indices.",
      "As you iterate, calculate complement = target - current_number.",
      "Look up complement in O(1) average time."
    ]
  },

  // =========================================================================
  // 3. FULL-STACK WEB: URL QUERY STRING PARSER
  // =========================================================================
  {
    id: "url-query-parser",
    title: "3. REST API URL Query Parameter Parser",
    shortTitle: "Query Param Parser",
    tradeTrack: "fullstack",
    difficulty: "Easy",
    category: "Web & Protocol Parsing",
    timeLimitMinutes: 15,
    functionName: "parse_query_params",
    description: `In backend web development (FastAPI/Express/Django), query parameters arrive as a raw query string (e.g. "search=python&page=2&sort=desc").
Write a function \`parse_query_params(query: str) -> dict\` that parses a URL query string into a key-value dictionary.
If the input query string is empty or contains no parameters, return an empty dictionary \`{}\`.`,
    constraints: [
      "Query string does not include the leading '?' mark.",
      "Keys and values are separated by '='.",
      "Parameter pairs are separated by '&'."
    ],
    examples: [
      {
        input: 'parse_query_params("search=fastapi&limit=10")',
        output: '{"limit": "10", "search": "fastapi"}',
        explanation: "Splits on '&' and maps each key=value pair."
      },
      {
        input: 'parse_query_params("")',
        output: '{}',
        explanation: "Empty string yields empty dictionary."
      }
    ],
    starterCode: `def parse_query_params(query: str) -> dict:
    if not query or not query.strip():
        return {}
    params = {}
    pairs = query.split("&")
    for pair in pairs:
        if "=" in pair:
            k, v = pair.split("=", 1)
            params[k] = v
    return params
`,
    testCases: [
      { input: 'parse_query_params("search=fastapi&limit=10")', expected: '{"search":"fastapi","limit":"10"}', args: ["search=fastapi&limit=10"] },
      { input: 'parse_query_params("name=alex&role=dev&active=true")', expected: '{"name":"alex","role":"dev","active":"true"}', args: ["name=alex&role=dev&active=true"] },
      { input: 'parse_query_params("")', expected: '{}', args: [""] },
      { input: 'parse_query_params("token=abc123xyz")', expected: '{"token":"abc123xyz"}', args: ["token=abc123xyz"] }
    ],
    referenceSolution: `def parse_query_params(query: str) -> dict:
    if not query:
        return {}
    result = {}
    for part in query.split("&"):
        if "=" in part:
            k, v = part.split("=", 1)
            result[k] = v
    return result`,
    hints: [
      "Split the input query by the '&' delimiter.",
      "For each segment, split at the first '=' using split('=', 1).",
      "Insert into the dictionary."
    ]
  },

  // =========================================================================
  // 4. DATA SCIENCE: MISSING VALUE IMPUTER
  // =========================================================================
  {
    id: "missing-imputer",
    title: "4. Data Imputation: Replace Nulls with Mean",
    shortTitle: "Mean Imputer",
    tradeTrack: "data-science",
    difficulty: "Easy",
    category: "Data Wrangling & Cleaning",
    timeLimitMinutes: 15,
    functionName: "impute_mean",
    description: `In data preprocessing, machine learning algorithms cannot process NaN or None values.
Write a function \`impute_mean(data: list) -> list\` that replaces every \`None\` value in an array with the arithmetic mean of all non-null numbers, rounded to 1 decimal place.
If all elements are None or the list is empty, return an empty list or the original list.`,
    constraints: [
      "List contains integers, floats, or None.",
      "At least one non-None numeric value exists if non-empty."
    ],
    examples: [
      {
        input: 'impute_mean([10, 20, None, 30])',
        output: '[10, 20, 20.0, 30]',
        explanation: "Mean of [10, 20, 30] is 20.0. Replace None with 20.0."
      }
    ],
    starterCode: `def impute_mean(data: list) -> list:
    valid = [x for x in data if x is not None]
    if not valid:
        return data
    mean_val = round(sum(valid) / len(valid), 1)
    return [mean_val if x is None else x for x in data]
`,
    testCases: [
      { input: "impute_mean([10, 20, None, 30])", expected: "[10,20,20,30]", args: [[10, 20, null, 30]] },
      { input: "impute_mean([2, None, 4, None, 6])", expected: "[2,4,4,4,6]", args: [[2, null, 4, null, 6]] },
      { input: "impute_mean([100, 200, 300])", expected: "[100,200,300]", args: [[100, 200, 300]] }
    ],
    referenceSolution: `def impute_mean(data: list) -> list:
    valid = [x for x in data if x is not None]
    if not valid:
        return data
    mean_val = round(sum(valid) / len(valid), 1)
    return [mean_val if x is None else x for x in data]`,
    hints: [
      "Filter the list for all elements that are not None.",
      "Calculate the average = sum(valid) / len(valid).",
      "Reconstruct the list replacing None with the average."
    ]
  },

  // =========================================================================
  // 5. CLOUD & DEVOPS: DOCKERFILE INSTRUCTION VALIDATOR
  // =========================================================================
  {
    id: "dockerfile-validator",
    title: "5. Production Dockerfile Instruction Linter",
    shortTitle: "Dockerfile Linter",
    tradeTrack: "cloud-devops",
    difficulty: "Easy",
    category: "Cloud & Container Systems",
    timeLimitMinutes: 15,
    functionName: "validate_dockerfile",
    description: `Every production Dockerfile must obey fundamental structural standards:
1. The first active non-comment instruction must be \`FROM\` (specifying a valid base image).
2. It must contain at least one \`CMD\` or \`ENTRYPOINT\` instruction specifying what container process to run.

Write a function \`validate_dockerfile(lines: list[str]) -> bool\` that takes a list of lines in a Dockerfile and returns \`True\` if it meets both rules, or \`False\` otherwise. Ignore empty lines and lines starting with '#' (comments).`,
    constraints: [
      "1 <= len(lines) <= 100",
      "Lines may contain leading/trailing whitespace."
    ],
    examples: [
      {
        input: 'validate_dockerfile(["FROM python:3.11", "COPY . /app", "CMD [\\"python\\", \\"main.py\\"]"])',
        output: "True",
        explanation: "Starts with FROM and includes a CMD instruction."
      },
      {
        input: 'validate_dockerfile(["RUN apt-get update", "CMD [\\"app\\"]"])',
        output: "False",
        explanation: "Does not start with FROM base image."
      }
    ],
    starterCode: `def validate_dockerfile(lines: list[str]) -> bool:
    instructions = []
    for line in lines:
        cleaned = line.strip()
        if cleaned and not cleaned.startswith("#"):
            instruction = cleaned.split()[0].upper()
            instructions.append(instruction)
            
    if not instructions or instructions[0] != "FROM":
        return False
        
    has_runner = any(inst in ("CMD", "ENTRYPOINT") for inst in instructions)
    return has_runner
`,
    testCases: [
      { 
        input: 'validate_dockerfile(["FROM python:3.11", "COPY . /app", "CMD [\\"python\\", \\"main.py\\"]"])', 
        expected: "True", 
        args: [["FROM python:3.11", "COPY . /app", 'CMD ["python", "main.py"]']] 
      },
      { 
        input: 'validate_dockerfile(["# Base", "FROM node:18-alpine", "RUN npm install", "ENTRYPOINT [\\"npm\\", \\"start\\"]"])', 
        expected: "True", 
        args: [["# Base", "FROM node:18-alpine", "RUN npm install", 'ENTRYPOINT ["npm", "start"]']] 
      },
      { 
        input: 'validate_dockerfile(["RUN pip install fastapi", "CMD [\\"uvicorn\\"]"])', 
        expected: "False", 
        args: [["RUN pip install fastapi", 'CMD ["uvicorn"]']] 
      },
      { 
        input: 'validate_dockerfile(["FROM ubuntu:22.04", "RUN apt update"])', 
        expected: "False", 
        args: [["FROM ubuntu:22.04", "RUN apt update"]] 
      }
    ],
    referenceSolution: `def validate_dockerfile(lines: list[str]) -> bool:
    active = [l.strip().split()[0].upper() for l in lines if l.strip() and not l.strip().startswith("#")]
    if not active or active[0] != "FROM":
        return False
    return "CMD" in active or "ENTRYPOINT" in active`,
    hints: [
      "Ignore comments (starting with #) and empty lines.",
      "Extract the first word of each instruction and uppercase it.",
      "Check if the very first active instruction is 'FROM'.",
      "Check if either 'CMD' or 'ENTRYPOINT' exists anywhere in the active list."
    ]
  },

  // =========================================================================
  // 6. STRINGS & TWO POINTERS: PALINDROME CLEANER (DSA)
  // =========================================================================
  {
    id: "palindrome-cleaner",
    title: "6. Alphanumeric Valid Palindrome (Two Pointers)",
    shortTitle: "Valid Palindrome",
    tradeTrack: "all",
    difficulty: "Easy",
    category: "Strings & Two Pointers",
    timeLimitMinutes: 15,
    functionName: "is_palindrome",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
Alphanumeric characters include letters and numbers.
Given a string \`s\`, return \`True\` if it is a palindrome, or \`False\` otherwise.`,
    constraints: [
      "1 <= len(s) <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    examples: [
      {
        input: 'is_palindrome("A man, a plan, a canal: Panama")',
        output: "True",
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 'is_palindrome("race a car")',
        output: "False",
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    starterCode: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
`,
    testCases: [
      { input: 'is_palindrome("A man, a plan, a canal: Panama")', expected: "True", args: ["A man, a plan, a canal: Panama"] },
      { input: 'is_palindrome("race a car")', expected: "False", args: ["race a car"] },
      { input: 'is_palindrome(" ")', expected: "True", args: [" "] },
      { input: 'is_palindrome("0P")', expected: "False", args: ["0P"] }
    ],
    referenceSolution: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
    hints: [
      "Use two pointers (one at the start, one at the end) moving inwards.",
      "Skip characters that are not isalnum().",
      "Compare characters case-insensitively."
    ]
  }
];
