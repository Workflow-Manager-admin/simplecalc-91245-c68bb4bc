#!/bin/bash
cd /home/kavia/workspace/code-generation/simplecalc-91245-c68bb4bc/calculator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

