#!/usr/bin/env bash

set -euo pipefail

PREVIOUS_VERSION=$(buildkite-agent meta-data get "rollback-version" --default "false")

if ! aws s3 ls "s3://webapps-${BUILDKITE_BRANCH}.localz.io/${S3_PATH}/${PREVIOUS_VERSION}" >/dev/null; then
  echo "The supplied version number (${PREVIOUS_VERSION}) does not exist"
  exit 1
fi

echo "Attempting rollback to ${PREVIOUS_VERSION}.."

aws s3 sync "s3://webapps-${BUILDKITE_BRANCH}.localz.io/${S3_PATH}/${PREVIOUS_VERSION}" "s3://webapps-${BUILDKITE_BRANCH}.localz.io/${S3_PATH}/latest" --delete --acl public-read --dry-run
