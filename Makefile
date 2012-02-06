SITE := site
ALL := all.js all.css index.html
ALL_CSS := css/style.css
ALL_JS := \
    jquery-1.7.js \
    jquery.jemplate.js \
    jquery.json-2.3.js \
    jquery.cookie.js \
    jquery.validate.min.js \
    \
    jemplate.js \
    template.js \
    \
    microformat.js \
    run.js

ALL_JS := $(ALL_JS:%=js/%)

all: build

build: $(ALL) $(SITE)
	mv $(ALL) $(SITE)
	cp -r img site

js/jemplate.js:
	jemplate --runtime > $@

js/template.js:
	jemplate --compile jemplate > $@

$(SITE):
	mkdir $@

index.html: template/*
	tt-render --path=template/ layout.html > $@

all.js: $(ALL_JS)
	rm -f all-*.js
	for f in $(ALL_JS); do \
	    echo ';' >> $@; \
	    echo >> $@; \
	    echo "// INCLUDE $$f" >> $@; \
	    cat $$f >> $@; \
	done
	perl -pi -e 's/\r//' $@

all.css: $(ALL_CSS)
	rm -f all-*.css
	for f in $(ALL_CSS); do \
	    echo "/* INCLUDE $$f */" >> $@; \
	    cat $$f >> $@; \
	done
	perl -pi -e 's/\r//' $@

css/%.css: css/%.less
	lessc $< > $@

clean purge:
	rm -fr index.html all* $(SITE) js/jemplate.js js/template.js css/*.css
