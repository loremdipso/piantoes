
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign$1(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* node_modules/smelte/src/components/Icon/Icon.svelte generated by Svelte v3.46.2 */

    const file$a = "node_modules/smelte/src/components/Icon/Icon.svelte";

    function create_fragment$c(ctx) {
    	let i;
    	let i_class_value;
    	let i_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			i = element("i");
    			if (default_slot) default_slot.c();
    			attr_dev(i, "aria-hidden", "true");
    			attr_dev(i, "class", i_class_value = "material-icons icon text-xl select-none " + /*$$props*/ ctx[5].class + " duration-200 ease-in" + " svelte-ysz42y");
    			attr_dev(i, "style", i_style_value = /*color*/ ctx[4] ? `color: ${/*color*/ ctx[4]}` : "");
    			toggle_class(i, "reverse", /*reverse*/ ctx[2]);
    			toggle_class(i, "tip", /*tip*/ ctx[3]);
    			toggle_class(i, "text-base", /*small*/ ctx[0]);
    			toggle_class(i, "text-xs", /*xs*/ ctx[1]);
    			add_location(i, file$a, 7, 0, 160);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);

    			if (default_slot) {
    				default_slot.m(i, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(i, "click", /*click_handler*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*$$props*/ 32 && i_class_value !== (i_class_value = "material-icons icon text-xl select-none " + /*$$props*/ ctx[5].class + " duration-200 ease-in" + " svelte-ysz42y")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (!current || dirty & /*color*/ 16 && i_style_value !== (i_style_value = /*color*/ ctx[4] ? `color: ${/*color*/ ctx[4]}` : "")) {
    				attr_dev(i, "style", i_style_value);
    			}

    			if (dirty & /*$$props, reverse*/ 36) {
    				toggle_class(i, "reverse", /*reverse*/ ctx[2]);
    			}

    			if (dirty & /*$$props, tip*/ 40) {
    				toggle_class(i, "tip", /*tip*/ ctx[3]);
    			}

    			if (dirty & /*$$props, small*/ 33) {
    				toggle_class(i, "text-base", /*small*/ ctx[0]);
    			}

    			if (dirty & /*$$props, xs*/ 34) {
    				toggle_class(i, "text-xs", /*xs*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon', slots, ['default']);
    	let { small = false } = $$props;
    	let { xs = false } = $$props;
    	let { reverse = false } = $$props;
    	let { tip = false } = $$props;
    	let { color = "default" } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props)));
    		if ('small' in $$new_props) $$invalidate(0, small = $$new_props.small);
    		if ('xs' in $$new_props) $$invalidate(1, xs = $$new_props.xs);
    		if ('reverse' in $$new_props) $$invalidate(2, reverse = $$new_props.reverse);
    		if ('tip' in $$new_props) $$invalidate(3, tip = $$new_props.tip);
    		if ('color' in $$new_props) $$invalidate(4, color = $$new_props.color);
    		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ small, xs, reverse, tip, color });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign$1(assign$1({}, $$props), $$new_props));
    		if ('small' in $$props) $$invalidate(0, small = $$new_props.small);
    		if ('xs' in $$props) $$invalidate(1, xs = $$new_props.xs);
    		if ('reverse' in $$props) $$invalidate(2, reverse = $$new_props.reverse);
    		if ('tip' in $$props) $$invalidate(3, tip = $$new_props.tip);
    		if ('color' in $$props) $$invalidate(4, color = $$new_props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [small, xs, reverse, tip, color, $$props, $$scope, slots, click_handler];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, {
    			small: 0,
    			xs: 1,
    			reverse: 2,
    			tip: 3,
    			color: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get small() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set small(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xs() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xs(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get reverse() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reverse(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tip() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tip(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const noDepth = ["white", "black", "transparent"];

    function getClass(prop, color, depth, defaultDepth) {
      if (noDepth.includes(color)) {
        return `${prop}-${color}`;
      }
      return `${prop}-${color}-${depth || defaultDepth} `;
    }

    function utils(color, defaultDepth = 500) {
      return {
        bg: depth => getClass("bg", color, depth, defaultDepth),
        border: depth => getClass("border", color, depth, defaultDepth),
        txt: depth => getClass("text", color, depth, defaultDepth),
        caret: depth => getClass("caret", color, depth, defaultDepth)
      };
    }

    class ClassBuilder$1 {
      constructor(classes, defaultClasses) {
        this.defaults =
          (typeof classes === "function" ? classes(defaultClasses) : classes) ||
          defaultClasses;

        this.classes = this.defaults;
      }

      flush() {
        this.classes = this.defaults;

        return this;
      }

      extend(...fns) {
        return this;
      }

      get() {
        return this.classes;
      }

      replace(classes, cond = true) {
        if (cond && classes) {
          this.classes = Object.keys(classes).reduce(
            (acc, from) => acc.replace(new RegExp(from, "g"), classes[from]),
            this.classes
          );
        }

        return this;
      }

      remove(classes, cond = true) {
        if (cond && classes) {
          this.classes = classes
            .split(" ")
            .reduce(
              (acc, cur) => acc.replace(new RegExp(cur, "g"), ""),
              this.classes
            );
        }

        return this;
      }

      add(className, cond = true, defaultValue) {
        if (!cond || !className) return this;

        switch (typeof className) {
          case "string":
          default:
            this.classes += ` ${className} `;
            return this;
          case "function":
            this.classes += ` ${className(defaultValue || this.classes)} `;
            return this;
        }
      }
    }

    // inspired by from smelte/classes.js
    // TODO(perf): is this performant?
    // export class ClassBuilder {
    // 	private defaultClasses: string[];
    // 	private classes: string[];

    // 	// TODO(feat): add dev detection of duplicate/conflicting styles
    // 	constructor(private defaults: string) {
    // 		this.classes = this.defaultClasses = defaults.split(" ");
    // 	}

    // 	reset() {
    // 		// TODO(perf): is this faster than splitting the string?
    // 		this.classes = [...this.defaultClasses];
    // 		return this;
    // 	}

    // 	add(classes: string) {
    // 		this.add_internal(classes);
    // 		return this;
    // 	}

    // 	addIf(cond: boolean, classes: string) {
    // 		if (cond) {
    // 			this.add_internal(classes);
    // 		}
    // 		return this;
    // 	}

    // 	addIfElse(cond: boolean, classes: string, otherClasses: string) {
    // 		if (cond) {
    // 			this.add_internal(classes);
    // 		} else {
    // 			this.add_internal(otherClasses);
    // 		}
    // 		return this;
    // 	}

    // 	get() {
    // 		return this.classes.join(" ");
    // 	}

    // 	private add_internal(classes: string) {
    // 		if (classes) {
    // 			this.classes.push(...classes.split(" "));
    // 		}
    // 	}
    // }

    const defaultReserved = ["class", "add", "remove", "replace", "value"];

    function filterProps(reserved, props) {
      const r = [...reserved, ...defaultReserved];

      return Object.keys(props).reduce(
        (acc, cur) =>
          cur.includes("$$") || cur.includes("Class") || r.includes(cur)
            ? acc
            : { ...acc, [cur]: props[cur] },
        {}
      );
    }

    // Thanks Lagden! https://svelte.dev/repl/61d9178d2b9944f2aa2bfe31612ab09f?version=3.6.7
    function ripple(color, centered) {
      return function(event) {
        const target = event.currentTarget;
        const circle = document.createElement("span");
        const d = Math.max(target.clientWidth, target.clientHeight);

        const removeCircle = () => {
          circle.remove();
          circle.removeEventListener("animationend", removeCircle);
        };

        circle.addEventListener("animationend", removeCircle);
        circle.style.width = circle.style.height = `${d}px`;
        const rect = target.getBoundingClientRect();

        if (centered) {
          circle.classList.add(
            "absolute",
            "top-0",
            "left-0",
            "ripple-centered",
            `bg-${color}-transDark`
          );
        } else {
          circle.style.left = `${event.clientX - rect.left - d / 2}px`;
          circle.style.top = `${event.clientY - rect.top - d / 2}px`;

          circle.classList.add("ripple-normal", `bg-${color}-trans`);
        }

        circle.classList.add("ripple");

        target.appendChild(circle);
      };
    }

    function r(color = "primary", centered = false) {
      return function(node) {
        const onMouseDown = ripple(color, centered);
        node.addEventListener("mousedown", onMouseDown);

        return {
          onDestroy: () => node.removeEventListener("mousedown", onMouseDown),
        };
      };
    }

    /* node_modules/smelte/src/components/Button/Button.svelte generated by Svelte v3.46.2 */
    const file$9 = "node_modules/smelte/src/components/Button/Button.svelte";

    // (128:0) {:else}
    function create_else_block$1(ctx) {
    	let button;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*icon*/ ctx[3] && create_if_block_2$1(ctx);
    	const default_slot_template = /*#slots*/ ctx[34].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[43], null);

    	let button_levels = [
    		{ class: /*classes*/ ctx[1] },
    		/*props*/ ctx[9],
    		{ type: /*type*/ ctx[6] },
    		{ disabled: /*disabled*/ ctx[2] }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign$1(button_data, button_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			button = element("button");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			set_attributes(button, button_data);
    			add_location(button, file$9, 128, 1, 3835);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if (if_block) if_block.m(button, null);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*ripple*/ ctx[8].call(null, button)),
    					listen_dev(button, "click", /*click_handler_3*/ ctx[42], false, false, false),
    					listen_dev(button, "click", /*click_handler_1*/ ctx[38], false, false, false),
    					listen_dev(button, "mouseover", /*mouseover_handler_1*/ ctx[39], false, false, false),
    					listen_dev(button, "focus", /*focus_handler_1*/ ctx[40], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*icon*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(button, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[43],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[43])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[43], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				(!current || dirty[0] & /*classes*/ 2) && { class: /*classes*/ ctx[1] },
    				/*props*/ ctx[9],
    				(!current || dirty[0] & /*type*/ 64) && { type: /*type*/ ctx[6] },
    				(!current || dirty[0] & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(128:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (109:0) {#if href}
    function create_if_block$4(ctx) {
    	let a;
    	let button;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*icon*/ ctx[3] && create_if_block_1$2(ctx);
    	const default_slot_template = /*#slots*/ ctx[34].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[43], null);

    	let button_levels = [
    		{ class: /*classes*/ ctx[1] },
    		/*props*/ ctx[9],
    		{ type: /*type*/ ctx[6] },
    		{ disabled: /*disabled*/ ctx[2] }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign$1(button_data, button_levels[i]);
    	}

    	let a_levels = [{ href: /*href*/ ctx[5] }, /*props*/ ctx[9]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign$1(a_data, a_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			a = element("a");
    			button = element("button");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			set_attributes(button, button_data);
    			add_location(button, file$9, 110, 2, 3564);
    			set_attributes(a, a_data);
    			add_location(a, file$9, 109, 1, 3540);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, button);
    			if (if_block) if_block.m(button, null);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*ripple*/ ctx[8].call(null, button)),
    					listen_dev(button, "click", /*click_handler_2*/ ctx[41], false, false, false),
    					listen_dev(button, "click", /*click_handler*/ ctx[35], false, false, false),
    					listen_dev(button, "mouseover", /*mouseover_handler*/ ctx[36], false, false, false),
    					listen_dev(button, "focus", /*focus_handler*/ ctx[37], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*icon*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(button, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 4096)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[43],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[43])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[43], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				(!current || dirty[0] & /*classes*/ 2) && { class: /*classes*/ ctx[1] },
    				/*props*/ ctx[9],
    				(!current || dirty[0] & /*type*/ 64) && { type: /*type*/ ctx[6] },
    				(!current || dirty[0] & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] }
    			]));

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty[0] & /*href*/ 32) && { href: /*href*/ ctx[5] },
    				/*props*/ ctx[9]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(109:0) {#if href}",
    		ctx
    	});

    	return block_1;
    }

    // (140:2) {#if icon}
    function create_if_block_2$1(ctx) {
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: {
    				class: /*iClasses*/ ctx[7],
    				small: /*small*/ ctx[4],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(icon_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty[0] & /*iClasses*/ 128) icon_1_changes.class = /*iClasses*/ ctx[7];
    			if (dirty[0] & /*small*/ 16) icon_1_changes.small = /*small*/ ctx[4];

    			if (dirty[0] & /*icon*/ 8 | dirty[1] & /*$$scope*/ 4096) {
    				icon_1_changes.$$scope = { dirty, ctx };
    			}

    			icon_1.$set(icon_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(140:2) {#if icon}",
    		ctx
    	});

    	return block_1;
    }

    // (141:3) <Icon class={iClasses} {small}>
    function create_default_slot_1(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*icon*/ ctx[3]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*icon*/ 8) set_data_dev(t, /*icon*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(141:3) <Icon class={iClasses} {small}>",
    		ctx
    	});

    	return block_1;
    }

    // (122:3) {#if icon}
    function create_if_block_1$2(ctx) {
    	let icon_1;
    	let current;

    	icon_1 = new Icon({
    			props: {
    				class: /*iClasses*/ ctx[7],
    				small: /*small*/ ctx[4],
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block_1 = {
    		c: function create() {
    			create_component(icon_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty[0] & /*iClasses*/ 128) icon_1_changes.class = /*iClasses*/ ctx[7];
    			if (dirty[0] & /*small*/ 16) icon_1_changes.small = /*small*/ ctx[4];

    			if (dirty[0] & /*icon*/ 8 | dirty[1] & /*$$scope*/ 4096) {
    				icon_1_changes.$$scope = { dirty, ctx };
    			}

    			icon_1.$set(icon_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(122:3) {#if icon}",
    		ctx
    	});

    	return block_1;
    }

    // (123:4) <Icon class={iClasses} {small}>
    function create_default_slot$3(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*icon*/ ctx[3]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*icon*/ 8) set_data_dev(t, /*icon*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(123:4) <Icon class={iClasses} {small}>",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$b(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$4, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[5]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    const classesDefault = "z-10 py-2 px-4 uppercase text-sm font-medium relative overflow-hidden";
    const basicDefault = "text-white duration-200 ease-in";
    const outlinedDefault = "bg-transparent border border-solid";
    const textDefault = "bg-transparent border-none px-4 hover:bg-transparent";
    const iconDefault = "p-4 flex items-center select-none";
    const fabDefault = "hover:bg-transparent";
    const smallDefault = "pt-1 pb-1 pl-2 pr-2 text-xs";
    const disabledDefault = "bg-gray-300 text-gray-500 dark:bg-dark-400 pointer-events-none hover:bg-gray-300 cursor-default";
    const elevationDefault = "hover:shadow shadow";

    function instance$b($$self, $$props, $$invalidate) {
    	let normal;
    	let lighter;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { value = false } = $$props;
    	let { outlined = false } = $$props;
    	let { text = false } = $$props;
    	let { block = false } = $$props;
    	let { disabled = false } = $$props;
    	let { icon = null } = $$props;
    	let { small = false } = $$props;
    	let { light = false } = $$props;
    	let { dark = false } = $$props;
    	let { flat = false } = $$props;
    	let { iconClass = "" } = $$props;
    	let { color = "primary" } = $$props;
    	let { href = null } = $$props;
    	let { fab = false } = $$props;
    	let { type = "button" } = $$props;
    	let { remove = "" } = $$props;
    	let { add = "" } = $$props;
    	let { replace = {} } = $$props;
    	let { classes = classesDefault } = $$props;
    	let { basicClasses = basicDefault } = $$props;
    	let { outlinedClasses = outlinedDefault } = $$props;
    	let { textClasses = textDefault } = $$props;
    	let { iconClasses = iconDefault } = $$props;
    	let { fabClasses = fabDefault } = $$props;
    	let { smallClasses = smallDefault } = $$props;
    	let { disabledClasses = disabledDefault } = $$props;
    	let { elevationClasses = elevationDefault } = $$props;
    	fab = fab || text && icon;
    	const basic = !outlined && !text && !fab;
    	const elevation = (basic || icon) && !disabled && !flat && !text;
    	let Classes = i => i;
    	let iClasses = i => i;
    	let shade = 0;
    	const { bg, border, txt } = utils(color);
    	const cb = new ClassBuilder$1(classes, classesDefault);
    	let iconCb;

    	if (icon) {
    		iconCb = new ClassBuilder$1(iconClass);
    	}

    	const ripple = r(text || fab || outlined ? color : "white");

    	const props = filterProps(
    		[
    			"outlined",
    			"text",
    			"color",
    			"block",
    			"disabled",
    			"icon",
    			"small",
    			"light",
    			"dark",
    			"flat",
    			"add",
    			"remove",
    			"replace"
    		],
    		$$props
    	);

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	const click_handler_2 = () => $$invalidate(0, value = !value);
    	const click_handler_3 = () => $$invalidate(0, value = !value);

    	$$self.$$set = $$new_props => {
    		$$invalidate(51, $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props)));
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('outlined' in $$new_props) $$invalidate(11, outlined = $$new_props.outlined);
    		if ('text' in $$new_props) $$invalidate(12, text = $$new_props.text);
    		if ('block' in $$new_props) $$invalidate(13, block = $$new_props.block);
    		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('icon' in $$new_props) $$invalidate(3, icon = $$new_props.icon);
    		if ('small' in $$new_props) $$invalidate(4, small = $$new_props.small);
    		if ('light' in $$new_props) $$invalidate(14, light = $$new_props.light);
    		if ('dark' in $$new_props) $$invalidate(15, dark = $$new_props.dark);
    		if ('flat' in $$new_props) $$invalidate(16, flat = $$new_props.flat);
    		if ('iconClass' in $$new_props) $$invalidate(17, iconClass = $$new_props.iconClass);
    		if ('color' in $$new_props) $$invalidate(18, color = $$new_props.color);
    		if ('href' in $$new_props) $$invalidate(5, href = $$new_props.href);
    		if ('fab' in $$new_props) $$invalidate(10, fab = $$new_props.fab);
    		if ('type' in $$new_props) $$invalidate(6, type = $$new_props.type);
    		if ('remove' in $$new_props) $$invalidate(19, remove = $$new_props.remove);
    		if ('add' in $$new_props) $$invalidate(20, add = $$new_props.add);
    		if ('replace' in $$new_props) $$invalidate(21, replace = $$new_props.replace);
    		if ('classes' in $$new_props) $$invalidate(1, classes = $$new_props.classes);
    		if ('basicClasses' in $$new_props) $$invalidate(22, basicClasses = $$new_props.basicClasses);
    		if ('outlinedClasses' in $$new_props) $$invalidate(23, outlinedClasses = $$new_props.outlinedClasses);
    		if ('textClasses' in $$new_props) $$invalidate(24, textClasses = $$new_props.textClasses);
    		if ('iconClasses' in $$new_props) $$invalidate(25, iconClasses = $$new_props.iconClasses);
    		if ('fabClasses' in $$new_props) $$invalidate(26, fabClasses = $$new_props.fabClasses);
    		if ('smallClasses' in $$new_props) $$invalidate(27, smallClasses = $$new_props.smallClasses);
    		if ('disabledClasses' in $$new_props) $$invalidate(28, disabledClasses = $$new_props.disabledClasses);
    		if ('elevationClasses' in $$new_props) $$invalidate(29, elevationClasses = $$new_props.elevationClasses);
    		if ('$$scope' in $$new_props) $$invalidate(43, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		utils,
    		ClassBuilder: ClassBuilder$1,
    		filterProps,
    		createRipple: r,
    		value,
    		outlined,
    		text,
    		block,
    		disabled,
    		icon,
    		small,
    		light,
    		dark,
    		flat,
    		iconClass,
    		color,
    		href,
    		fab,
    		type,
    		remove,
    		add,
    		replace,
    		classesDefault,
    		basicDefault,
    		outlinedDefault,
    		textDefault,
    		iconDefault,
    		fabDefault,
    		smallDefault,
    		disabledDefault,
    		elevationDefault,
    		classes,
    		basicClasses,
    		outlinedClasses,
    		textClasses,
    		iconClasses,
    		fabClasses,
    		smallClasses,
    		disabledClasses,
    		elevationClasses,
    		basic,
    		elevation,
    		Classes,
    		iClasses,
    		shade,
    		bg,
    		border,
    		txt,
    		cb,
    		iconCb,
    		ripple,
    		props,
    		lighter,
    		normal
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(51, $$props = assign$1(assign$1({}, $$props), $$new_props));
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('outlined' in $$props) $$invalidate(11, outlined = $$new_props.outlined);
    		if ('text' in $$props) $$invalidate(12, text = $$new_props.text);
    		if ('block' in $$props) $$invalidate(13, block = $$new_props.block);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('icon' in $$props) $$invalidate(3, icon = $$new_props.icon);
    		if ('small' in $$props) $$invalidate(4, small = $$new_props.small);
    		if ('light' in $$props) $$invalidate(14, light = $$new_props.light);
    		if ('dark' in $$props) $$invalidate(15, dark = $$new_props.dark);
    		if ('flat' in $$props) $$invalidate(16, flat = $$new_props.flat);
    		if ('iconClass' in $$props) $$invalidate(17, iconClass = $$new_props.iconClass);
    		if ('color' in $$props) $$invalidate(18, color = $$new_props.color);
    		if ('href' in $$props) $$invalidate(5, href = $$new_props.href);
    		if ('fab' in $$props) $$invalidate(10, fab = $$new_props.fab);
    		if ('type' in $$props) $$invalidate(6, type = $$new_props.type);
    		if ('remove' in $$props) $$invalidate(19, remove = $$new_props.remove);
    		if ('add' in $$props) $$invalidate(20, add = $$new_props.add);
    		if ('replace' in $$props) $$invalidate(21, replace = $$new_props.replace);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    		if ('basicClasses' in $$props) $$invalidate(22, basicClasses = $$new_props.basicClasses);
    		if ('outlinedClasses' in $$props) $$invalidate(23, outlinedClasses = $$new_props.outlinedClasses);
    		if ('textClasses' in $$props) $$invalidate(24, textClasses = $$new_props.textClasses);
    		if ('iconClasses' in $$props) $$invalidate(25, iconClasses = $$new_props.iconClasses);
    		if ('fabClasses' in $$props) $$invalidate(26, fabClasses = $$new_props.fabClasses);
    		if ('smallClasses' in $$props) $$invalidate(27, smallClasses = $$new_props.smallClasses);
    		if ('disabledClasses' in $$props) $$invalidate(28, disabledClasses = $$new_props.disabledClasses);
    		if ('elevationClasses' in $$props) $$invalidate(29, elevationClasses = $$new_props.elevationClasses);
    		if ('Classes' in $$props) Classes = $$new_props.Classes;
    		if ('iClasses' in $$props) $$invalidate(7, iClasses = $$new_props.iClasses);
    		if ('shade' in $$props) $$invalidate(30, shade = $$new_props.shade);
    		if ('iconCb' in $$props) $$invalidate(31, iconCb = $$new_props.iconCb);
    		if ('lighter' in $$props) $$invalidate(32, lighter = $$new_props.lighter);
    		if ('normal' in $$props) $$invalidate(33, normal = $$new_props.normal);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*light, dark, shade*/ 1073790976) {
    			{
    				$$invalidate(30, shade = light ? 200 : 0);
    				$$invalidate(30, shade = dark ? -400 : shade);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*shade*/ 1073741824) {
    			$$invalidate(33, normal = 500 - shade);
    		}

    		if ($$self.$$.dirty[0] & /*shade*/ 1073741824) {
    			$$invalidate(32, lighter = 400 - shade);
    		}

    		$$invalidate(1, classes = cb.flush().add(basicClasses, basic, basicDefault).add(`${bg(normal)} hover:${bg(lighter)}`, basic).add(elevationClasses, elevation, elevationDefault).add(outlinedClasses, outlined, outlinedDefault).add(`${border(lighter)} ${txt(normal)} hover:${bg("trans")} dark-hover:${bg("transDark")}`, outlined).add(`${txt(lighter)}`, text).add(textClasses, text, textDefault).add(iconClasses, icon, iconDefault).remove("py-2", icon).remove(txt(lighter), fab).add(disabledClasses, disabled, disabledDefault).add(smallClasses, small, smallDefault).add("flex items-center justify-center h-8 w-8", small && icon).add("border-solid", outlined).add("rounded-full", icon).add("w-full", block).add("rounded", basic || outlined || text).add("button", !icon).add(fabClasses, fab, fabDefault).add(`hover:${bg("transLight")}`, fab).add($$props.class).remove(remove).replace(replace).add(add).get());

    		if ($$self.$$.dirty[0] & /*fab, iconClass*/ 132096 | $$self.$$.dirty[1] & /*iconCb*/ 1) {
    			if (iconCb) {
    				$$invalidate(7, iClasses = iconCb.flush().add(txt(), fab && !iconClass).get());
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		value,
    		classes,
    		disabled,
    		icon,
    		small,
    		href,
    		type,
    		iClasses,
    		ripple,
    		props,
    		fab,
    		outlined,
    		text,
    		block,
    		light,
    		dark,
    		flat,
    		iconClass,
    		color,
    		remove,
    		add,
    		replace,
    		basicClasses,
    		outlinedClasses,
    		textClasses,
    		iconClasses,
    		fabClasses,
    		smallClasses,
    		disabledClasses,
    		elevationClasses,
    		shade,
    		iconCb,
    		lighter,
    		normal,
    		slots,
    		click_handler,
    		mouseover_handler,
    		focus_handler,
    		click_handler_1,
    		mouseover_handler_1,
    		focus_handler_1,
    		click_handler_2,
    		click_handler_3,
    		$$scope
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$b,
    			create_fragment$b,
    			safe_not_equal,
    			{
    				value: 0,
    				outlined: 11,
    				text: 12,
    				block: 13,
    				disabled: 2,
    				icon: 3,
    				small: 4,
    				light: 14,
    				dark: 15,
    				flat: 16,
    				iconClass: 17,
    				color: 18,
    				href: 5,
    				fab: 10,
    				type: 6,
    				remove: 19,
    				add: 20,
    				replace: 21,
    				classes: 1,
    				basicClasses: 22,
    				outlinedClasses: 23,
    				textClasses: 24,
    				iconClasses: 25,
    				fabClasses: 26,
    				smallClasses: 27,
    				disabledClasses: 28,
    				elevationClasses: 29
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get value() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outlined() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outlined(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get small() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set small(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dark() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dark(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get flat() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set flat(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconClass() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconClass(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fab() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fab(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get remove() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set remove(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get add() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set add(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get basicClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basicClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outlinedClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outlinedClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fabClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fabClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get smallClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set smallClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabledClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabledClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get elevationClasses() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set elevationClasses(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }
    function quadIn(t) {
        return t * t;
    }
    function quadOut(t) {
        return -t * (t - 2.0);
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
    }

    /* node_modules/smelte/src/components/Util/Spacer.svelte generated by Svelte v3.46.2 */

    const file$8 = "node_modules/smelte/src/components/Util/Spacer.svelte";

    function create_fragment$a(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "flex-grow");
    			add_location(div, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Spacer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Spacer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Spacer$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Spacer",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    const Spacer = Spacer$1;

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules/smelte/src/components/Snackbar/Snackbar.svelte generated by Svelte v3.46.2 */
    const file$7 = "node_modules/smelte/src/components/Snackbar/Snackbar.svelte";
    const get_action_slot_changes = dirty => ({});
    const get_action_slot_context = ctx => ({});

    // (84:0) {#if value && running === hash}
    function create_if_block$3(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t;
    	let div0_intro;
    	let div0_outro;
    	let div1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[24], null);
    	let if_block = !/*noAction*/ ctx[5] && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			if (if_block) if_block.c();
    			add_location(div0, file$7, 86, 3, 2533);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(/*wClasses*/ ctx[7]) + " svelte-1rsms7r"));
    			add_location(div1, file$7, 85, 2, 2507);
    			attr_dev(div2, "class", "fixed w-full h-full top-0 left-0 z-30 pointer-events-none");
    			add_location(div2, file$7, 84, 1, 2433);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div0, t);
    			if (if_block) if_block.m(div0, null);
    			/*div0_binding*/ ctx[22](div0);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*click_handler_1*/ ctx[23], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16777216)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[24],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[24])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[24], dirty, null),
    						null
    					);
    				}
    			}

    			if (!/*noAction*/ ctx[5]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*noAction*/ 32) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*wClasses*/ 128 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*wClasses*/ ctx[7]) + " svelte-1rsms7r"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(if_block);

    			add_render_callback(() => {
    				if (div0_outro) div0_outro.end(1);
    				div0_intro = create_in_transition(div0, scale, /*inProps*/ ctx[3]);
    				div0_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(if_block);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fade, /*outProps*/ ctx[4]);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block) if_block.d();
    			/*div0_binding*/ ctx[22](null);
    			if (detaching && div0_outro) div0_outro.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(84:0) {#if value && running === hash}",
    		ctx
    	});

    	return block;
    }

    // (94:4) {#if !noAction}
    function create_if_block_1$1(ctx) {
    	let spacer;
    	let t;
    	let current;
    	spacer = new Spacer({ $$inline: true });
    	const action_slot_template = /*#slots*/ ctx[20].action;
    	const action_slot = create_slot(action_slot_template, ctx, /*$$scope*/ ctx[24], get_action_slot_context);
    	const action_slot_or_fallback = action_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			create_component(spacer.$$.fragment);
    			t = space();
    			if (action_slot_or_fallback) action_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			mount_component(spacer, target, anchor);
    			insert_dev(target, t, anchor);

    			if (action_slot_or_fallback) {
    				action_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (action_slot) {
    				if (action_slot.p && (!current || dirty & /*$$scope*/ 16777216)) {
    					update_slot_base(
    						action_slot,
    						action_slot_template,
    						ctx,
    						/*$$scope*/ ctx[24],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[24])
    						: get_slot_changes(action_slot_template, /*$$scope*/ ctx[24], dirty, get_action_slot_changes),
    						get_action_slot_context
    					);
    				}
    			} else {
    				if (action_slot_or_fallback && action_slot_or_fallback.p && (!current || dirty & /*value, timeout*/ 5)) {
    					action_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(spacer.$$.fragment, local);
    			transition_in(action_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(spacer.$$.fragment, local);
    			transition_out(action_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(spacer, detaching);
    			if (detaching) detach_dev(t);
    			if (action_slot_or_fallback) action_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(94:4) {#if !noAction}",
    		ctx
    	});

    	return block;
    }

    // (97:6) {#if !timeout}
    function create_if_block_2(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				text: true,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[21]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 16777216) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(97:6) {#if !timeout}",
    		ctx
    	});

    	return block;
    }

    // (98:7) <Button text on:click={() => (value = false)}         >
    function create_default_slot$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Close");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(98:7) <Button text on:click={() => (value = false)}         >",
    		ctx
    	});

    	return block;
    }

    // (96:25)        
    function fallback_block(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = !/*timeout*/ ctx[2] && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!/*timeout*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*timeout*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(96:25)        ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*value*/ ctx[0] && running === /*hash*/ ctx[1] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*value*/ ctx[0] && running === /*hash*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*value, running, hash*/ 3) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const queue = writable([]);
    let running = false;
    const wrapperDefault = "fixed w-full h-full flex items-center justify-center pointer-events-none";

    function instance$9($$self, $$props, $$invalidate) {
    	let toggler;
    	let c;
    	let $queue;
    	validate_store(queue, 'queue');
    	component_subscribe($$self, queue, $$value => $$invalidate(19, $queue = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Snackbar', slots, ['default','action']);
    	let { value = false } = $$props;
    	let { timeout = 2000 } = $$props;
    	let { inProps = { duration: 100, easing: quadIn } } = $$props;

    	let { outProps = {
    		duration: 100,
    		easing: quadOut,
    		delay: 150
    	} } = $$props;

    	let { color = "gray" } = $$props;
    	let { text = "white" } = $$props;
    	let { top = false } = $$props;
    	let { bottom = true } = $$props;
    	let { right = false } = $$props;
    	let { left = false } = $$props;
    	let { noAction = true } = $$props;
    	let { hash = false } = $$props;
    	const dispatch = createEventDispatcher();

    	const classesDefault = `pointer-events-auto flex absolute py-2 px-4 z-30 mb-4 content-between mx-auto
      rounded items-center shadow-sm h-12`;

    	let { classes = wrapperDefault } = $$props;
    	const cb = new ClassBuilder$1($$props.class, classesDefault);
    	const wrapperCb = new ClassBuilder$1(classes, wrapperDefault);
    	let wClasses = i => i;
    	let tm;
    	let node;

    	let bg = () => {
    		
    	};

    	function toggle(h, id) {
    		if (value === false && running === false) {
    			return;
    		}

    		$$invalidate(1, hash = running = $$invalidate(0, value = id));
    		if (!timeout) return;

    		$$invalidate(15, tm = setTimeout(
    			() => {
    				$$invalidate(0, value = running = $$invalidate(1, hash = false));
    				dispatch("finish");

    				if ($queue.length) {
    					$queue.shift()();
    				}
    			},
    			timeout
    		));
    	}

    	wClasses = wrapperCb.flush().add(`text-${text}`).get();
    	const click_handler = () => $$invalidate(0, value = false);

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			node = $$value;
    			(((((((($$invalidate(6, node), $$invalidate(17, c)), $$invalidate(16, bg)), $$invalidate(8, color)), $$invalidate(12, right)), $$invalidate(10, top)), $$invalidate(13, left)), $$invalidate(11, bottom)), $$invalidate(5, noAction));
    		});
    	}

    	const click_handler_1 = () => $$invalidate(0, value = false);

    	$$self.$$set = $$new_props => {
    		$$invalidate(30, $$props = assign$1(assign$1({}, $$props), exclude_internal_props($$new_props)));
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('timeout' in $$new_props) $$invalidate(2, timeout = $$new_props.timeout);
    		if ('inProps' in $$new_props) $$invalidate(3, inProps = $$new_props.inProps);
    		if ('outProps' in $$new_props) $$invalidate(4, outProps = $$new_props.outProps);
    		if ('color' in $$new_props) $$invalidate(8, color = $$new_props.color);
    		if ('text' in $$new_props) $$invalidate(9, text = $$new_props.text);
    		if ('top' in $$new_props) $$invalidate(10, top = $$new_props.top);
    		if ('bottom' in $$new_props) $$invalidate(11, bottom = $$new_props.bottom);
    		if ('right' in $$new_props) $$invalidate(12, right = $$new_props.right);
    		if ('left' in $$new_props) $$invalidate(13, left = $$new_props.left);
    		if ('noAction' in $$new_props) $$invalidate(5, noAction = $$new_props.noAction);
    		if ('hash' in $$new_props) $$invalidate(1, hash = $$new_props.hash);
    		if ('classes' in $$new_props) $$invalidate(14, classes = $$new_props.classes);
    		if ('$$scope' in $$new_props) $$invalidate(24, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		writable,
    		queue,
    		running,
    		fade,
    		scale,
    		createEventDispatcher,
    		quadOut,
    		quadIn,
    		Button,
    		Spacer,
    		utils,
    		ClassBuilder: ClassBuilder$1,
    		value,
    		timeout,
    		inProps,
    		outProps,
    		color,
    		text,
    		top,
    		bottom,
    		right,
    		left,
    		noAction,
    		hash,
    		dispatch,
    		classesDefault,
    		wrapperDefault,
    		classes,
    		cb,
    		wrapperCb,
    		wClasses,
    		tm,
    		node,
    		bg,
    		toggle,
    		c,
    		toggler,
    		$queue
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(30, $$props = assign$1(assign$1({}, $$props), $$new_props));
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('timeout' in $$props) $$invalidate(2, timeout = $$new_props.timeout);
    		if ('inProps' in $$props) $$invalidate(3, inProps = $$new_props.inProps);
    		if ('outProps' in $$props) $$invalidate(4, outProps = $$new_props.outProps);
    		if ('color' in $$props) $$invalidate(8, color = $$new_props.color);
    		if ('text' in $$props) $$invalidate(9, text = $$new_props.text);
    		if ('top' in $$props) $$invalidate(10, top = $$new_props.top);
    		if ('bottom' in $$props) $$invalidate(11, bottom = $$new_props.bottom);
    		if ('right' in $$props) $$invalidate(12, right = $$new_props.right);
    		if ('left' in $$props) $$invalidate(13, left = $$new_props.left);
    		if ('noAction' in $$props) $$invalidate(5, noAction = $$new_props.noAction);
    		if ('hash' in $$props) $$invalidate(1, hash = $$new_props.hash);
    		if ('classes' in $$props) $$invalidate(14, classes = $$new_props.classes);
    		if ('wClasses' in $$props) $$invalidate(7, wClasses = $$new_props.wClasses);
    		if ('tm' in $$props) $$invalidate(15, tm = $$new_props.tm);
    		if ('node' in $$props) $$invalidate(6, node = $$new_props.node);
    		if ('bg' in $$props) $$invalidate(16, bg = $$new_props.bg);
    		if ('c' in $$props) $$invalidate(17, c = $$new_props.c);
    		if ('toggler' in $$props) $$invalidate(18, toggler = $$new_props.toggler);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*color*/ 256) {
    			{
    				const u = utils(color || "gray");
    				$$invalidate(16, bg = u.bg);
    			}
    		}

    		if ($$self.$$.dirty & /*hash, value*/ 3) {
    			{
    				$$invalidate(1, hash = hash || (value ? btoa(`${value}${new Date().valueOf()}`) : null));
    				($$invalidate(0, value), $$invalidate(1, hash));
    			}
    		}

    		if ($$self.$$.dirty & /*value, hash*/ 3) {
    			$$invalidate(18, toggler = () => toggle(value, hash));
    		}

    		if ($$self.$$.dirty & /*value, toggler*/ 262145) {
    			if (value) {
    				queue.update(u => [...u, toggler]);
    			}
    		}

    		if ($$self.$$.dirty & /*value, $queue*/ 524289) {
    			if (!running && value && $queue.length) {
    				$queue.shift()();
    			}
    		}

    		if ($$self.$$.dirty & /*value, tm*/ 32769) {
    			if (!value) clearTimeout(tm);
    		}

    		if ($$self.$$.dirty & /*bg, color, right, top, left, bottom, noAction*/ 81184) {
    			$$invalidate(17, c = cb.flush().add(bg(800), color).add("right-0 mr-2", right).add("top-0 mt-2", top).add("left-0 ml-2", left).add("bottom-0", bottom).add("snackbar", !noAction).get());
    		}

    		if ($$self.$$.dirty & /*node, c*/ 131136) {
    			// for some reason it doesn't get updated otherwise
    			if (node) $$invalidate(6, node.classList = c, node);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		value,
    		hash,
    		timeout,
    		inProps,
    		outProps,
    		noAction,
    		node,
    		wClasses,
    		color,
    		text,
    		top,
    		bottom,
    		right,
    		left,
    		classes,
    		tm,
    		bg,
    		c,
    		toggler,
    		$queue,
    		slots,
    		click_handler,
    		div0_binding,
    		click_handler_1,
    		$$scope
    	];
    }

    class Snackbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			value: 0,
    			timeout: 2,
    			inProps: 3,
    			outProps: 4,
    			color: 8,
    			text: 9,
    			top: 10,
    			bottom: 11,
    			right: 12,
    			left: 13,
    			noAction: 5,
    			hash: 1,
    			classes: 14
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Snackbar",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get value() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get timeout() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set timeout(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inProps() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inProps(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outProps() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outProps(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get top() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set top(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bottom() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bottom(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get right() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set right(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get left() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set left(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noAction() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noAction(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hash() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hash(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get classes() {
    		throw new Error("<Snackbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<Snackbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function withColor(color, store) {
      return message =>
        store.update(u => [
          ...u,
          {
            message,
            ts: new Date(),
            color,
            toString() {
              return message;
            }
          }
        ]);
    }

    function notificationQueue() {
      const store = writable([]);

      return {
        subscribe: store.subscribe,

        notify: withColor("gray", store),
        error: withColor("error", store),
        alert: withColor("alert", store),

        remove: i =>
          store.update(u => {
            u.splice(i, 1);
            return u;
          })
      };
    }

    /* node_modules/smelte/src/components/Snackbar/Notifications.svelte generated by Svelte v3.46.2 */

    notificationQueue();

    /* src/components/common/Toast.svelte generated by Svelte v3.46.2 */

    // (32:0) <Snackbar  value={ts}  hash={ts}  top  {color}  {...item}  on:finish={() => {   queue.remove($queue.indexOf(item));   item = false;  }} >
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*message*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*message*/ 16) set_data_dev(t, /*message*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(32:0) <Snackbar  value={ts}  hash={ts}  top  {color}  {...item}  on:finish={() => {   queue.remove($queue.indexOf(item));   item = false;  }} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let snackbar;
    	let current;

    	const snackbar_spread_levels = [
    		{ value: /*ts*/ ctx[5] },
    		{ hash: /*ts*/ ctx[5] },
    		{ top: true },
    		{ color: /*color*/ ctx[0] },
    		/*item*/ ctx[2]
    	];

    	let snackbar_props = {
    		$$slots: { default: [create_default_slot$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < snackbar_spread_levels.length; i += 1) {
    		snackbar_props = assign$1(snackbar_props, snackbar_spread_levels[i]);
    	}

    	snackbar = new Snackbar({ props: snackbar_props, $$inline: true });
    	snackbar.$on("finish", /*finish_handler*/ ctx[6]);

    	const block = {
    		c: function create() {
    			create_component(snackbar.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(snackbar, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const snackbar_changes = (dirty & /*ts, color, item*/ 37)
    			? get_spread_update(snackbar_spread_levels, [
    					dirty & /*ts*/ 32 && { value: /*ts*/ ctx[5] },
    					dirty & /*ts*/ 32 && { hash: /*ts*/ ctx[5] },
    					snackbar_spread_levels[2],
    					dirty & /*color*/ 1 && { color: /*color*/ ctx[0] },
    					dirty & /*item*/ 4 && get_spread_object(/*item*/ ctx[2])
    				])
    			: {};

    			if (dirty & /*$$scope, message*/ 144) {
    				snackbar_changes.$$scope = { dirty, ctx };
    			}

    			snackbar.$set(snackbar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(snackbar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(snackbar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(snackbar, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const toaster = notificationQueue();

    function instance$8($$self, $$props, $$invalidate) {
    	let $queue,
    		$$unsubscribe_queue = noop,
    		$$subscribe_queue = () => ($$unsubscribe_queue(), $$unsubscribe_queue = subscribe(queue, $$value => $$invalidate(3, $queue = $$value)), queue);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_queue());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Toast', slots, []);
    	let { color = "alert" } = $$props;
    	let { queue = toaster } = $$props;
    	validate_store(queue, 'queue');
    	$$subscribe_queue();
    	let message;
    	let item;
    	let ts;
    	const writable_props = ['color', 'queue'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Toast> was created with unknown prop '${key}'`);
    	});

    	const finish_handler = () => {
    		queue.remove($queue.indexOf(item));
    		$$invalidate(2, item = false);
    	};

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('queue' in $$props) $$subscribe_queue($$invalidate(1, queue = $$props.queue));
    	};

    	$$self.$capture_state = () => ({
    		notificationQueue,
    		toaster,
    		Snackbar,
    		color,
    		queue,
    		message,
    		item,
    		ts,
    		$queue
    	});

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('queue' in $$props) $$subscribe_queue($$invalidate(1, queue = $$props.queue));
    		if ('message' in $$props) $$invalidate(4, message = $$props.message);
    		if ('item' in $$props) $$invalidate(2, item = $$props.item);
    		if ('ts' in $$props) $$invalidate(5, ts = $$props.ts);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*item, $queue*/ 12) {
    			{
    				if (!item) {
    					$$invalidate(2, item = $queue[0]);
    				}

    				if (typeof item === "string") {
    					$$invalidate(4, message = item);
    				} else if (item) {
    					$$invalidate(4, message = item.toString());
    					$$invalidate(0, color = item.color);
    					$$invalidate(5, ts = item.ts);
    				}
    			}
    		}
    	};

    	return [color, queue, item, $queue, message, ts, finish_handler];
    }

    class Toast extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, { color: 0, queue: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Toast",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get color() {
    		throw new Error("<Toast>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Toast>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get queue() {
    		throw new Error("<Toast>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set queue(value) {
    		throw new Error("<Toast>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const show_sheet_music = writable(true);

    /*! js-cookie v3.0.1 | MIT */
    /* eslint-disable no-var */
    function assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */

    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */

    /* eslint-disable no-var */

    function init (converter, defaultAttributes) {
      function set (key, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }

        attributes = assign({}, defaultAttributes, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }

        key = encodeURIComponent(key)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie =
          key + '=' + converter.write(value, key) + stringifiedAttributes)
      }

      function get (key) {
        if (typeof document === 'undefined' || (arguments.length && !key)) {
          return
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');

          try {
            var foundKey = decodeURIComponent(parts[0]);
            jar[foundKey] = converter.read(value, foundKey);

            if (key === foundKey) {
              break
            }
          } catch (e) {}
        }

        return key ? jar[key] : jar
      }

      return Object.create(
        {
          set: set,
          get: get,
          remove: function (key, attributes) {
            set(
              key,
              '',
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }

    init(defaultConverter, { path: '/' });

    const active_key = writable(null);

    var NoteType;
    (function (NoteType) {
        NoteType["A"] = "a";
        NoteType["B"] = "b";
        NoteType["C"] = "c";
        NoteType["D"] = "d";
        NoteType["E"] = "e";
        NoteType["F"] = "f";
        NoteType["G"] = "g";
    })(NoteType || (NoteType = {}));

    /* src/components/Line.svelte generated by Svelte v3.46.2 */
    const file$6 = "src/components/Line.svelte";

    // (10:1) {#if show}
    function create_if_block$2(ctx) {
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*sharp*/ ctx[3]) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "note-container svelte-11cpvv7");
    			add_location(div, file$6, 10, 2, 435);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(10:1) {#if show}",
    		ctx
    	});

    	return block;
    }

    // (14:3) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "note svelte-11cpvv7");
    			if (!src_url_equal(img.src, img_src_value = "/resources/quarter_note.svg")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$6, 14, 4, 559);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(14:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:3) {#if sharp}
    function create_if_block_1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "note svelte-11cpvv7");
    			if (!src_url_equal(img.src, img_src_value = "/resources/sharp_quarter_note.svg")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$6, 12, 4, 483);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(12:3) {#if sharp}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let if_block = /*show*/ ctx[2] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "line svelte-11cpvv7");
    			toggle_class(div, "lined", /*lined*/ ctx[0]);
    			toggle_class(div, "partialLined", /*partialLined*/ ctx[1] && /*show*/ ctx[2]);
    			add_location(div, file$6, 8, 0, 348);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*show*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*lined*/ 1) {
    				toggle_class(div, "lined", /*lined*/ ctx[0]);
    			}

    			if (dirty & /*partialLined, show*/ 6) {
    				toggle_class(div, "partialLined", /*partialLined*/ ctx[1] && /*show*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let show;
    	let sharp;
    	let $active_key;
    	validate_store(active_key, 'active_key');
    	component_subscribe($$self, active_key, $$value => $$invalidate(5, $active_key = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Line', slots, []);
    	let { type } = $$props;
    	let { lined = false } = $$props;
    	let { partialLined = false } = $$props;
    	const writable_props = ['type', 'lined', 'partialLined'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Line> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('lined' in $$props) $$invalidate(0, lined = $$props.lined);
    		if ('partialLined' in $$props) $$invalidate(1, partialLined = $$props.partialLined);
    	};

    	$$self.$capture_state = () => ({
    		active_key,
    		type,
    		lined,
    		partialLined,
    		show,
    		sharp,
    		$active_key
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('lined' in $$props) $$invalidate(0, lined = $$props.lined);
    		if ('partialLined' in $$props) $$invalidate(1, partialLined = $$props.partialLined);
    		if ('show' in $$props) $$invalidate(2, show = $$props.show);
    		if ('sharp' in $$props) $$invalidate(3, sharp = $$props.sharp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$active_key, type*/ 48) {
    			$$invalidate(2, show = ($active_key === null || $active_key === void 0
    			? void 0
    			: $active_key.type) === type);
    		}

    		if ($$self.$$.dirty & /*show, $active_key*/ 36) {
    			$$invalidate(3, sharp = show && ($active_key === null || $active_key === void 0
    			? void 0
    			: $active_key.sharp));
    		}
    	};

    	return [lined, partialLined, show, sharp, type, $active_key];
    }

    class Line extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, { type: 4, lined: 0, partialLined: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Line",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*type*/ ctx[4] === undefined && !('type' in props)) {
    			console.warn("<Line> was created without expected prop 'type'");
    		}
    	}

    	get type() {
    		throw new Error("<Line>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Line>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lined() {
    		throw new Error("<Line>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lined(value) {
    		throw new Error("<Line>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get partialLined() {
    		throw new Error("<Line>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set partialLined(value) {
    		throw new Error("<Line>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/SheetMusic.svelte generated by Svelte v3.46.2 */
    const file$5 = "src/components/SheetMusic.svelte";

    function create_fragment$6(ctx) {
    	let div6;
    	let div2;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div1;
    	let line0;
    	let t1;
    	let line1;
    	let t2;
    	let line2;
    	let t3;
    	let line3;
    	let t4;
    	let line4;
    	let t5;
    	let line5;
    	let t6;
    	let line6;
    	let t7;
    	let line7;
    	let t8;
    	let line8;
    	let t9;
    	let line9;
    	let t10;
    	let line10;
    	let t11;
    	let line11;
    	let t12;
    	let line12;
    	let t13;
    	let line13;
    	let t14;
    	let line14;
    	let t15;
    	let div5;
    	let div3;
    	let img1;
    	let img1_src_value;
    	let t16;
    	let div4;
    	let line15;
    	let t17;
    	let line16;
    	let t18;
    	let line17;
    	let t19;
    	let line18;
    	let t20;
    	let line19;
    	let t21;
    	let line20;
    	let t22;
    	let line21;
    	let t23;
    	let line22;
    	let t24;
    	let line23;
    	let t25;
    	let line24;
    	let t26;
    	let line25;
    	let t27;
    	let line26;
    	let t28;
    	let line27;
    	let t29;
    	let line28;
    	let t30;
    	let line29;
    	let current;

    	line0 = new Line({
    			props: { type: NoteType.B },
    			$$inline: true
    		});

    	line1 = new Line({
    			props: { type: NoteType.A, partialLined: true },
    			$$inline: true
    		});

    	line2 = new Line({
    			props: { type: NoteType.G },
    			$$inline: true
    		});

    	line3 = new Line({
    			props: { type: NoteType.F, lined: true },
    			$$inline: true
    		});

    	line4 = new Line({
    			props: { type: NoteType.E },
    			$$inline: true
    		});

    	line5 = new Line({
    			props: { type: NoteType.D, lined: true },
    			$$inline: true
    		});

    	line6 = new Line({
    			props: { type: NoteType.C },
    			$$inline: true
    		});

    	line7 = new Line({
    			props: { type: NoteType.B, lined: true },
    			$$inline: true
    		});

    	line8 = new Line({
    			props: { type: NoteType.A },
    			$$inline: true
    		});

    	line9 = new Line({
    			props: { type: NoteType.G, lined: true },
    			$$inline: true
    		});

    	line10 = new Line({
    			props: { type: NoteType.F },
    			$$inline: true
    		});

    	line11 = new Line({
    			props: { type: NoteType.E, lined: true },
    			$$inline: true
    		});

    	line12 = new Line({
    			props: { type: NoteType.D },
    			$$inline: true
    		});

    	line13 = new Line({
    			props: { type: NoteType.C, partialLined: true },
    			$$inline: true
    		});

    	line14 = new Line({
    			props: { type: NoteType.B },
    			$$inline: true
    		});

    	line15 = new Line({
    			props: { type: NoteType.D },
    			$$inline: true
    		});

    	line16 = new Line({
    			props: { type: NoteType.C, partialLined: true },
    			$$inline: true
    		});

    	line17 = new Line({
    			props: { type: NoteType.B },
    			$$inline: true
    		});

    	line18 = new Line({
    			props: { type: NoteType.A, lined: true },
    			$$inline: true
    		});

    	line19 = new Line({
    			props: { type: NoteType.G },
    			$$inline: true
    		});

    	line20 = new Line({
    			props: { type: NoteType.F, lined: true },
    			$$inline: true
    		});

    	line21 = new Line({
    			props: { type: NoteType.E },
    			$$inline: true
    		});

    	line22 = new Line({
    			props: { type: NoteType.D, lined: true },
    			$$inline: true
    		});

    	line23 = new Line({
    			props: { type: NoteType.C },
    			$$inline: true
    		});

    	line24 = new Line({
    			props: { type: NoteType.B, lined: true },
    			$$inline: true
    		});

    	line25 = new Line({
    			props: { type: NoteType.A },
    			$$inline: true
    		});

    	line26 = new Line({
    			props: { type: NoteType.G, lined: true },
    			$$inline: true
    		});

    	line27 = new Line({
    			props: { type: NoteType.F },
    			$$inline: true
    		});

    	line28 = new Line({
    			props: { type: NoteType.E, partialLined: true },
    			$$inline: true
    		});

    	line29 = new Line({
    			props: { type: NoteType.D },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div1 = element("div");
    			create_component(line0.$$.fragment);
    			t1 = space();
    			create_component(line1.$$.fragment);
    			t2 = space();
    			create_component(line2.$$.fragment);
    			t3 = space();
    			create_component(line3.$$.fragment);
    			t4 = space();
    			create_component(line4.$$.fragment);
    			t5 = space();
    			create_component(line5.$$.fragment);
    			t6 = space();
    			create_component(line6.$$.fragment);
    			t7 = space();
    			create_component(line7.$$.fragment);
    			t8 = space();
    			create_component(line8.$$.fragment);
    			t9 = space();
    			create_component(line9.$$.fragment);
    			t10 = space();
    			create_component(line10.$$.fragment);
    			t11 = space();
    			create_component(line11.$$.fragment);
    			t12 = space();
    			create_component(line12.$$.fragment);
    			t13 = space();
    			create_component(line13.$$.fragment);
    			t14 = space();
    			create_component(line14.$$.fragment);
    			t15 = space();
    			div5 = element("div");
    			div3 = element("div");
    			img1 = element("img");
    			t16 = space();
    			div4 = element("div");
    			create_component(line15.$$.fragment);
    			t17 = space();
    			create_component(line16.$$.fragment);
    			t18 = space();
    			create_component(line17.$$.fragment);
    			t19 = space();
    			create_component(line18.$$.fragment);
    			t20 = space();
    			create_component(line19.$$.fragment);
    			t21 = space();
    			create_component(line20.$$.fragment);
    			t22 = space();
    			create_component(line21.$$.fragment);
    			t23 = space();
    			create_component(line22.$$.fragment);
    			t24 = space();
    			create_component(line23.$$.fragment);
    			t25 = space();
    			create_component(line24.$$.fragment);
    			t26 = space();
    			create_component(line25.$$.fragment);
    			t27 = space();
    			create_component(line26.$$.fragment);
    			t28 = space();
    			create_component(line27.$$.fragment);
    			t29 = space();
    			create_component(line28.$$.fragment);
    			t30 = space();
    			create_component(line29.$$.fragment);
    			if (!src_url_equal(img0.src, img0_src_value = "resources/treble_clef.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "class", "svelte-16ryz3r");
    			add_location(img0, file$5, 8, 3, 224);
    			attr_dev(div0, "class", "img-container svelte-16ryz3r");
    			add_location(div0, file$5, 7, 2, 193);
    			attr_dev(div1, "class", "line-container svelte-16ryz3r");
    			add_location(div1, file$5, 11, 2, 276);
    			attr_dev(div2, "class", "sheet-music-section svelte-16ryz3r");
    			add_location(div2, file$5, 6, 1, 157);
    			if (!src_url_equal(img1.src, img1_src_value = "resources/base_clef.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "svelte-16ryz3r");
    			add_location(img1, file$5, 34, 3, 899);
    			attr_dev(div3, "class", "img-container svelte-16ryz3r");
    			add_location(div3, file$5, 33, 2, 868);
    			attr_dev(div4, "class", "line-container svelte-16ryz3r");
    			add_location(div4, file$5, 37, 2, 949);
    			attr_dev(div5, "class", "sheet-music-section svelte-16ryz3r");
    			add_location(div5, file$5, 32, 1, 832);
    			attr_dev(div6, "class", "sheet-music svelte-16ryz3r");
    			add_location(div6, file$5, 5, 0, 130);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			mount_component(line0, div1, null);
    			append_dev(div1, t1);
    			mount_component(line1, div1, null);
    			append_dev(div1, t2);
    			mount_component(line2, div1, null);
    			append_dev(div1, t3);
    			mount_component(line3, div1, null);
    			append_dev(div1, t4);
    			mount_component(line4, div1, null);
    			append_dev(div1, t5);
    			mount_component(line5, div1, null);
    			append_dev(div1, t6);
    			mount_component(line6, div1, null);
    			append_dev(div1, t7);
    			mount_component(line7, div1, null);
    			append_dev(div1, t8);
    			mount_component(line8, div1, null);
    			append_dev(div1, t9);
    			mount_component(line9, div1, null);
    			append_dev(div1, t10);
    			mount_component(line10, div1, null);
    			append_dev(div1, t11);
    			mount_component(line11, div1, null);
    			append_dev(div1, t12);
    			mount_component(line12, div1, null);
    			append_dev(div1, t13);
    			mount_component(line13, div1, null);
    			append_dev(div1, t14);
    			mount_component(line14, div1, null);
    			append_dev(div6, t15);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, img1);
    			append_dev(div5, t16);
    			append_dev(div5, div4);
    			mount_component(line15, div4, null);
    			append_dev(div4, t17);
    			mount_component(line16, div4, null);
    			append_dev(div4, t18);
    			mount_component(line17, div4, null);
    			append_dev(div4, t19);
    			mount_component(line18, div4, null);
    			append_dev(div4, t20);
    			mount_component(line19, div4, null);
    			append_dev(div4, t21);
    			mount_component(line20, div4, null);
    			append_dev(div4, t22);
    			mount_component(line21, div4, null);
    			append_dev(div4, t23);
    			mount_component(line22, div4, null);
    			append_dev(div4, t24);
    			mount_component(line23, div4, null);
    			append_dev(div4, t25);
    			mount_component(line24, div4, null);
    			append_dev(div4, t26);
    			mount_component(line25, div4, null);
    			append_dev(div4, t27);
    			mount_component(line26, div4, null);
    			append_dev(div4, t28);
    			mount_component(line27, div4, null);
    			append_dev(div4, t29);
    			mount_component(line28, div4, null);
    			append_dev(div4, t30);
    			mount_component(line29, div4, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(line0.$$.fragment, local);
    			transition_in(line1.$$.fragment, local);
    			transition_in(line2.$$.fragment, local);
    			transition_in(line3.$$.fragment, local);
    			transition_in(line4.$$.fragment, local);
    			transition_in(line5.$$.fragment, local);
    			transition_in(line6.$$.fragment, local);
    			transition_in(line7.$$.fragment, local);
    			transition_in(line8.$$.fragment, local);
    			transition_in(line9.$$.fragment, local);
    			transition_in(line10.$$.fragment, local);
    			transition_in(line11.$$.fragment, local);
    			transition_in(line12.$$.fragment, local);
    			transition_in(line13.$$.fragment, local);
    			transition_in(line14.$$.fragment, local);
    			transition_in(line15.$$.fragment, local);
    			transition_in(line16.$$.fragment, local);
    			transition_in(line17.$$.fragment, local);
    			transition_in(line18.$$.fragment, local);
    			transition_in(line19.$$.fragment, local);
    			transition_in(line20.$$.fragment, local);
    			transition_in(line21.$$.fragment, local);
    			transition_in(line22.$$.fragment, local);
    			transition_in(line23.$$.fragment, local);
    			transition_in(line24.$$.fragment, local);
    			transition_in(line25.$$.fragment, local);
    			transition_in(line26.$$.fragment, local);
    			transition_in(line27.$$.fragment, local);
    			transition_in(line28.$$.fragment, local);
    			transition_in(line29.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(line0.$$.fragment, local);
    			transition_out(line1.$$.fragment, local);
    			transition_out(line2.$$.fragment, local);
    			transition_out(line3.$$.fragment, local);
    			transition_out(line4.$$.fragment, local);
    			transition_out(line5.$$.fragment, local);
    			transition_out(line6.$$.fragment, local);
    			transition_out(line7.$$.fragment, local);
    			transition_out(line8.$$.fragment, local);
    			transition_out(line9.$$.fragment, local);
    			transition_out(line10.$$.fragment, local);
    			transition_out(line11.$$.fragment, local);
    			transition_out(line12.$$.fragment, local);
    			transition_out(line13.$$.fragment, local);
    			transition_out(line14.$$.fragment, local);
    			transition_out(line15.$$.fragment, local);
    			transition_out(line16.$$.fragment, local);
    			transition_out(line17.$$.fragment, local);
    			transition_out(line18.$$.fragment, local);
    			transition_out(line19.$$.fragment, local);
    			transition_out(line20.$$.fragment, local);
    			transition_out(line21.$$.fragment, local);
    			transition_out(line22.$$.fragment, local);
    			transition_out(line23.$$.fragment, local);
    			transition_out(line24.$$.fragment, local);
    			transition_out(line25.$$.fragment, local);
    			transition_out(line26.$$.fragment, local);
    			transition_out(line27.$$.fragment, local);
    			transition_out(line28.$$.fragment, local);
    			transition_out(line29.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(line0);
    			destroy_component(line1);
    			destroy_component(line2);
    			destroy_component(line3);
    			destroy_component(line4);
    			destroy_component(line5);
    			destroy_component(line6);
    			destroy_component(line7);
    			destroy_component(line8);
    			destroy_component(line9);
    			destroy_component(line10);
    			destroy_component(line11);
    			destroy_component(line12);
    			destroy_component(line13);
    			destroy_component(line14);
    			destroy_component(line15);
    			destroy_component(line16);
    			destroy_component(line17);
    			destroy_component(line18);
    			destroy_component(line19);
    			destroy_component(line20);
    			destroy_component(line21);
    			destroy_component(line22);
    			destroy_component(line23);
    			destroy_component(line24);
    			destroy_component(line25);
    			destroy_component(line26);
    			destroy_component(line27);
    			destroy_component(line28);
    			destroy_component(line29);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SheetMusic', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SheetMusic> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ NoteType, Line });
    	return [];
    }

    class SheetMusic extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SheetMusic",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    // inspired by from smelte/classes.js
    // TODO(perf): is this performant?
    class ClassBuilder {
        // TODO(feat): add dev detection of duplicate/conflicting styles
        constructor(defaults) {
            this.defaults = defaults;
            this.classes = this.defaultClasses = defaults.split(" ");
        }
        reset() {
            // TODO(perf): is this faster than splitting the string?
            this.classes = [...this.defaultClasses];
            return this;
        }
        add(classes) {
            this.add_internal(classes);
            return this;
        }
        addIf(cond, classes) {
            if (cond) {
                this.add_internal(classes);
            }
            return this;
        }
        addIfElse(cond, classes, otherClasses) {
            if (cond) {
                this.add_internal(classes);
            }
            else {
                this.add_internal(otherClasses);
            }
            return this;
        }
        get() {
            return this.classes.join(" ");
        }
        add_internal(classes) {
            if (classes) {
                this.classes.push(...classes.split(" "));
            }
        }
    }

    /* src/components/Key.svelte generated by Svelte v3.46.2 */
    const file$4 = "src/components/Key.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let div_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*classes*/ ctx[0]) + " svelte-1kmpbpm"));
    			add_location(div, file$4, 20, 0, 459);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "mousedown", /*mousedown_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*classes*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*classes*/ ctx[0]) + " svelte-1kmpbpm"))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let pressed;
    	let classes;
    	let $active_key;
    	validate_store(active_key, 'active_key');
    	component_subscribe($$self, active_key, $$value => $$invalidate(4, $active_key = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Key', slots, []);
    	let { key } = $$props;

    	function click() {
    		if ($active_key === key) {
    			set_store_value(active_key, $active_key = null, $active_key);
    		} else {
    			set_store_value(active_key, $active_key = key, $active_key);
    		}
    	}

    	let cb = new ClassBuilder("key");
    	const writable_props = ['key'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Key> was created with unknown prop '${key}'`);
    	});

    	const mousedown_handler = () => click();

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(2, key = $$props.key);
    	};

    	$$self.$capture_state = () => ({
    		ClassBuilder,
    		active_key,
    		key,
    		click,
    		cb,
    		pressed,
    		classes,
    		$active_key
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(2, key = $$props.key);
    		if ('cb' in $$props) $$invalidate(6, cb = $$props.cb);
    		if ('pressed' in $$props) $$invalidate(3, pressed = $$props.pressed);
    		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$active_key, key*/ 20) {
    			$$invalidate(3, pressed = $active_key === key);
    		}

    		if ($$self.$$.dirty & /*key, pressed*/ 12) {
    			$$invalidate(0, classes = cb.reset().addIfElse(key.sharp, "key-black", "key-white").addIf(pressed, "pressed").get());
    		}
    	};

    	return [classes, click, key, pressed, $active_key, mousedown_handler];
    }

    class Key extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, { key: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Key",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*key*/ ctx[2] === undefined && !('key' in props)) {
    			console.warn("<Key> was created without expected prop 'key'");
    		}
    	}

    	get key() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function get_audio(slug) {
        const audio = new Audio(`resources/${slug}.mp3`);
        return audio;
    }
    function create_key({ type, octave, sharp }) {
        return {
            type,
            octave,
            sharp,
            name: `${type.toString().toLocaleUpperCase()}${octave}${sharp ? "#" : ""}`,
            audio: get_audio(`${type}${octave}${sharp ? "_sharp" : ""}`)
        };
    }
    const KEYS = [
        create_key({ type: NoteType.C, octave: 4 }),
        create_key({ type: NoteType.C, octave: 4, sharp: true }),
        create_key({ type: NoteType.D, octave: 4 }),
        create_key({ type: NoteType.D, octave: 4, sharp: true }),
        create_key({ type: NoteType.E, octave: 4 }),
        create_key({ type: NoteType.F, octave: 4 }),
        create_key({ type: NoteType.F, octave: 4, sharp: true }),
        create_key({ type: NoteType.G, octave: 4 }),
        create_key({ type: NoteType.G, octave: 4, sharp: true }),
        create_key({ type: NoteType.A, octave: 5 }),
        create_key({ type: NoteType.A, octave: 5, sharp: true }),
        create_key({ type: NoteType.B, octave: 5 }),
    ];
    // NOTE: normally we wouldn't want to mutate global state during module load, but
    // whatever. It's a css property - what could go wrong?
    const num_white_keys = KEYS.filter(key => !key.sharp).length;
    document.documentElement.style.setProperty("--num-white-keys", `${num_white_keys} `);

    /* src/components/Piano.svelte generated by Svelte v3.46.2 */
    const file$3 = "src/components/Piano.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (6:1) {#each KEYS as key}
    function create_each_block(ctx) {
    	let key;
    	let current;

    	key = new Key({
    			props: { key: /*key*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(key.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(key, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(key, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(6:1) {#each KEYS as key}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let current;
    	let each_value = KEYS;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "piano svelte-wmp73b");
    			add_location(div, file$3, 4, 0, 103);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*KEYS*/ 0) {
    				each_value = KEYS;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Piano', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Piano> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Key, KEYS });
    	return [];
    }

    class Piano extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Piano",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const is_muted = writable(false);

    /* src/components/AppHeader.svelte generated by Svelte v3.46.2 */

    const { console: console_1 } = globals;
    const file$2 = "src/components/AppHeader.svelte";

    // (41:0) {#if show_install_button && deferredPrompt}
    function create_if_block$1(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				color: "secondary",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[4]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(41:0) {#if show_install_button && deferredPrompt}",
    		ctx
    	});

    	return block;
    }

    // (42:1) <Button on:click={() => install()} color="secondary">
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("install");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(42:1) <Button on:click={() => install()} color=\\\"secondary\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let t0_value = (/*$active_key*/ ctx[1]?.name || "none") + "";
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let current;
    	let if_block = /*show_install_button*/ ctx[2] && /*deferredPrompt*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(div, "class", "header-text flex-grow text-center");
    			add_location(div, file$2, 36, 0, 1057);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$active_key*/ 2) && t0_value !== (t0_value = (/*$active_key*/ ctx[1]?.name || "none") + "")) set_data_dev(t0, t0_value);

    			if (/*show_install_button*/ ctx[2] && /*deferredPrompt*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*deferredPrompt*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getPWADisplayMode() {
    	const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    	if (document.referrer.startsWith("android-app://")) {
    		return "twa";
    	} else if (navigator.standalone || isStandalone) {
    		return "standalone";
    	}

    	return "browser";
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $active_key;
    	validate_store(active_key, 'active_key');
    	component_subscribe($$self, active_key, $$value => $$invalidate(1, $active_key = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AppHeader', slots, []);
    	let show_install_button = getPWADisplayMode() === "browser";
    	let deferredPrompt;

    	onMount(() => {
    		window.addEventListener("beforeinstallprompt", e => {
    			e.preventDefault();
    			$$invalidate(0, deferredPrompt = e);
    		});
    	});

    	function install() {
    		if (deferredPrompt) {
    			deferredPrompt.prompt();

    			deferredPrompt.userChoice.then(choice => {
    				if (choice.outcome === "accepted") {
    					console.log("yay!");
    				}

    				$$invalidate(0, deferredPrompt = null);
    			});
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<AppHeader> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => install();

    	$$self.$capture_state = () => ({
    		active_key,
    		onMount,
    		Button,
    		getPWADisplayMode,
    		show_install_button,
    		deferredPrompt,
    		install,
    		$active_key
    	});

    	$$self.$inject_state = $$props => {
    		if ('show_install_button' in $$props) $$invalidate(2, show_install_button = $$props.show_install_button);
    		if ('deferredPrompt' in $$props) $$invalidate(0, deferredPrompt = $$props.deferredPrompt);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [deferredPrompt, $active_key, show_install_button, install, click_handler];
    }

    class AppHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppHeader",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/SoundPlayer.svelte generated by Svelte v3.46.2 */

    function create_fragment$2(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $is_muted;
    	validate_store(is_muted, 'is_muted');
    	component_subscribe($$self, is_muted, $$value => $$invalidate(0, $is_muted = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SoundPlayer', slots, []);

    	active_key.subscribe(key => {
    		if (key && !$is_muted) {
    			key.audio.play();
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SoundPlayer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ active_key, is_muted, $is_muted });
    	return [];
    }

    class SoundPlayer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SoundPlayer",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/common/GithubCorner.svelte generated by Svelte v3.46.2 */

    const file$1 = "src/components/common/GithubCorner.svelte";

    function create_fragment$1(ctx) {
    	let a;
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let svg_class_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "class", "background");
    			attr_dev(path0, "d", "M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z");
    			add_location(path0, file$1, 17, 2, 460);
    			attr_dev(path1, "d", "M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2");
    			attr_dev(path1, "fill", "currentColor");
    			set_style(path1, "transform-origin", "130px 106px");
    			attr_dev(path1, "class", "octo-arm svelte-1rr76ng");
    			add_location(path1, file$1, 21, 2, 552);
    			attr_dev(path2, "d", "M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z");
    			attr_dev(path2, "fill", "currentColor");
    			attr_dev(path2, "class", "octo-body");
    			add_location(path2, file$1, 27, 2, 841);
    			attr_dev(svg, "width", "80");
    			attr_dev(svg, "height", "80");
    			attr_dev(svg, "viewBox", "0 0 250 250");
    			attr_dev(svg, "aria-hidden", "true");
    			set_style(svg, "fill", /*fill*/ ctx[1]);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(/*classes*/ ctx[2]) + " svelte-1rr76ng"));
    			add_location(svg, file$1, 9, 1, 337);
    			attr_dev(a, "href", /*href*/ ctx[0]);
    			attr_dev(a, "target", "#");
    			attr_dev(a, "class", "github-corner svelte-1rr76ng");
    			attr_dev(a, "aria-label", "View source on GitHub");
    			add_location(a, file$1, 8, 0, 257);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, svg);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*fill*/ 2) {
    				set_style(svg, "fill", /*fill*/ ctx[1]);
    			}

    			if (dirty & /*classes*/ 4 && svg_class_value !== (svg_class_value = "" + (null_to_empty(/*classes*/ ctx[2]) + " svelte-1rr76ng"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*href*/ 1) {
    				attr_dev(a, "href", /*href*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let classes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GithubCorner', slots, []);
    	let { href } = $$props;
    	let { position = "topRight" } = $$props;
    	let { fill = "#ff2768" } = $$props;
    	let { small = false } = $$props;
    	const writable_props = ['href', 'position', 'fill', 'small'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GithubCorner> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('position' in $$props) $$invalidate(3, position = $$props.position);
    		if ('fill' in $$props) $$invalidate(1, fill = $$props.fill);
    		if ('small' in $$props) $$invalidate(4, small = $$props.small);
    	};

    	$$self.$capture_state = () => ({ href, position, fill, small, classes });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('position' in $$props) $$invalidate(3, position = $$props.position);
    		if ('fill' in $$props) $$invalidate(1, fill = $$props.fill);
    		if ('small' in $$props) $$invalidate(4, small = $$props.small);
    		if ('classes' in $$props) $$invalidate(2, classes = $$props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*position, small*/ 24) {
    			$$invalidate(2, classes = `${position}${small ? " small" : ""}`);
    		}
    	};

    	return [href, fill, classes, position, small];
    }

    class GithubCorner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { href: 0, position: 3, fill: 1, small: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GithubCorner",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*href*/ ctx[0] === undefined && !('href' in props)) {
    			console.warn("<GithubCorner> was created without expected prop 'href'");
    		}
    	}

    	get href() {
    		throw new Error("<GithubCorner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<GithubCorner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<GithubCorner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<GithubCorner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fill() {
    		throw new Error("<GithubCorner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fill(value) {
    		throw new Error("<GithubCorner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get small() {
    		throw new Error("<GithubCorner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set small(value) {
    		throw new Error("<GithubCorner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.2 */
    const file = "src/App.svelte";

    // (30:1) {#if $show_sheet_music}
    function create_if_block(ctx) {
    	let sheetmusic;
    	let current;
    	sheetmusic = new SheetMusic({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(sheetmusic.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sheetmusic, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sheetmusic.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sheetmusic.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sheetmusic, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(30:1) {#if $show_sheet_music}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let header;
    	let appheader;
    	let t0;
    	let githubcorner;
    	let t1;
    	let soundplayer;
    	let t2;
    	let toast;
    	let t3;
    	let main;
    	let t4;
    	let piano;
    	let current;
    	appheader = new AppHeader({ $$inline: true });

    	githubcorner = new GithubCorner({
    			props: {
    				href: "https://github.com/loremdipso/piantoes",
    				position: "topLeft",
    				small: true
    			},
    			$$inline: true
    		});

    	soundplayer = new SoundPlayer({ $$inline: true });
    	toast = new Toast({ $$inline: true });
    	let if_block = /*$show_sheet_music*/ ctx[0] && create_if_block(ctx);
    	piano = new Piano({ $$inline: true });

    	const block = {
    		c: function create() {
    			header = element("header");
    			create_component(appheader.$$.fragment);
    			t0 = space();
    			create_component(githubcorner.$$.fragment);
    			t1 = space();
    			create_component(soundplayer.$$.fragment);
    			t2 = space();
    			create_component(toast.$$.fragment);
    			t3 = space();
    			main = element("main");
    			if (if_block) if_block.c();
    			t4 = space();
    			create_component(piano.$$.fragment);
    			attr_dev(header, "class", "py-1 relative slide-in-from-top bg-primary-300 dark:bg-black flex h-16 space-between items-center left-0 p-0 shadow top-0 w-full z-20 svelte-1dafn4y");
    			add_location(header, file, 13, 0, 582);
    			attr_dev(main, "class", "fade-in svelte-1dafn4y");
    			add_location(main, file, 28, 0, 885);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			mount_component(appheader, header, null);
    			append_dev(header, t0);
    			mount_component(githubcorner, header, null);
    			insert_dev(target, t1, anchor);
    			mount_component(soundplayer, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(toast, target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t4);
    			mount_component(piano, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$show_sheet_music*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*$show_sheet_music*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(main, t4);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(appheader.$$.fragment, local);
    			transition_in(githubcorner.$$.fragment, local);
    			transition_in(soundplayer.$$.fragment, local);
    			transition_in(toast.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(piano.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(appheader.$$.fragment, local);
    			transition_out(githubcorner.$$.fragment, local);
    			transition_out(soundplayer.$$.fragment, local);
    			transition_out(toast.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(piano.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(appheader);
    			destroy_component(githubcorner);
    			if (detaching) detach_dev(t1);
    			destroy_component(soundplayer, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(toast, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			destroy_component(piano);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $show_sheet_music;
    	validate_store(show_sheet_music, 'show_sheet_music');
    	component_subscribe($$self, show_sheet_music, $$value => $$invalidate(0, $show_sheet_music = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Toast,
    		show_sheet_music,
    		SheetMusic,
    		Piano,
    		AppHeader,
    		SoundPlayer,
    		GithubCorner,
    		$show_sheet_music
    	});

    	return [$show_sheet_music];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
