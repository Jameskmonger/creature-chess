# Stage 1: build every workspace plugin's browser bundle so the final
# nginx image can serve the built-in set directly. web-base
# already has every plugin's source + tsc dist; `build:web` produces
# each plugin's `dist/web/index.js`. Operator-overlay mods at /mods/
# are served on top of this via nginx try_files at runtime.
FROM local/web-base AS builtin-bundles
ENV NX_DAEMON=false
WORKDIR /code
RUN yarn nx run-many -t build:web && yarn cache clean

# Assemble built-in bundles into a flat id-tree at /builtin: every
# `modules/<id>/dist/web/index.js` becomes `/builtin/<id>/dist/web/index.js`.
# The path mirrors operator-overlay layout (`/mods/<id>/dist/web/index.js`)
# so the same nginx try_files entry serves either source.
RUN set -e; \
	mkdir -p /builtin; \
	cd /code/modules; \
	for src in $(find . -mindepth 4 -maxdepth 5 -type f -path '*/dist/web/index.js'); do \
		id_dir=$(echo "$src" | sed -E 's|^\./||; s|/dist/web/index\.js$||'); \
		dest="/builtin/${id_dir}/dist/web"; \
		mkdir -p "$dest"; \
		cp "$src" "$dest/index.js"; \
	done

# Bake any plugin's `images/` tree next to its bundle. Mirrors the
# operator-overlay layout (`/mods/<id>/images/...`) so the same
# `/plugins/<id>/images/...` nginx rule serves both.
RUN set -e; \
	cd /code/modules; \
	for img_dir in $(find . -mindepth 3 -maxdepth 4 -type d -name images); do \
		id_dir=$(echo "$img_dir" | sed -E 's|^\./||; s|/images$||'); \
		dest="/builtin/${id_dir}"; \
		mkdir -p "$dest"; \
		cp -r "$img_dir" "$dest/"; \
	done

# Stage 2: the actual nginx image - config + the built-in bundle tree
# plus the dynamic images mount. /mods/ is bind-mounted by compose;
# web-game's static assets come in via volume from web-game-builder.
FROM nginx
COPY nginx/local-dev/nginx.conf /etc/nginx/nginx.conf
COPY --from=builtin-bundles /builtin /builtin
VOLUME /usr/share/nginx/html/images
