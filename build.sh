#!/bin/bash

set -euo pipefail


export RUN=

make install

# cp static-site.tgz /output
# cp -rf public/* /publish/

# s3cmd --acl-public \
#       -v \
#       --no-mime-magic \
#       --guess-mime-type \
#       --no-preserve \
#       --delete-removed \
#       --access_key=${AWS_ACCESS_KEY_ID} \
#       --secret_key=${AWS_SECRET_ACCESS_KEY} \
#       --cf-invalidate \
#       sync -r /publish/* s3://${AWS_BUCKET}/