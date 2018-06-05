webpackJsonp([3],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var extend = __webpack_require__(252);
__webpack_require__(139);

/**
 * Write loading image to a container for ajax request
 *
 * @param container: a DOM element
 * @param theme: dark or white
 */
var showLoadingImage = function showLoadingImage(container) {
    var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dark';

    var loading_div = createElement('div', { class: 'barspinner ' + theme, html: Array.from(new Array(5)).map(function (x, i) {
            return '<div class="rect' + (i + 1) + '"></div>';
        }).join('') });
    container.html(loading_div);
};

/**
 * Returns the highest z-index in the page.
 * Accepts a selector to only check those elements,
 * uses all container tags by default
 * If no element found, returns null.
 *
 * @param selector: a selector for target elements
 * @return int|null
 */
var getHighestZIndex = function getHighestZIndex() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div,p,area,nav,section,header,canvas,aside,span';

    var elements = selector.split(',');
    var all = [];

    for (var i = 0; i < elements.length; i++) {
        var els = document.getElementsByTagName(elements);
        for (var j = 0; j < els.length; j++) {
            if (els[i].offsetParent) {
                var z = els[i].style['z-index'];
                if (!isNaN(z)) {
                    all.push(z);
                }
            }
        }
    }

    return all.length ? Math.max.apply(Math, all) : null;
};

var downloadCSV = function downloadCSV(csv_contents) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data.csv';

    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(new Blob([csv_contents], { type: 'text/csv;charset=utf-8;' }), filename);
    } else {
        // Other browsers
        var csv = 'data:text/csv;charset=utf-8,' + csv_contents;
        var download_link = createElement('a', { href: encodeURI(csv), download: filename });

        if (document.body) {
            document.body.appendChild(download_link);
            download_link.click();
            document.body.removeChild(download_link);
        }
    }
};

var template = function template(string, content) {
    return string.replace(/\[_(\d+)]/g, function (s, index) {
        return content[+index - 1];
    });
};

var isEmptyObject = function isEmptyObject(obj) {
    var is_empty = true;
    if (obj && obj instanceof Object) {
        Object.keys(obj).forEach(function (key) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) is_empty = false;
        });
    }
    return is_empty;
};

var cloneObject = function cloneObject(obj) {
    return !isEmptyObject(obj) ? extend(true, Array.isArray(obj) ? [] : {}, obj) : obj;
};

var isDeepEqual = function isDeepEqual(a, b) {
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
        return false;
    } else if (Array.isArray(a)) {
        return isEqualArray(a, b);
    } else if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
        return isEqualObject(a, b);
    }
    // else
    return a === b;
};

var isEqualArray = function isEqualArray(arr1, arr2) {
    return arr1 === arr2 || arr1.length === arr2.length && arr1.every(function (value, idx) {
        return isDeepEqual(value, arr2[idx]);
    });
};

var isEqualObject = function isEqualObject(obj1, obj2) {
    return obj1 === obj2 || Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(function (key) {
        return isDeepEqual(obj1[key], obj2[key]);
    });
};

var getPropertyValue = function getPropertyValue(obj, k) {
    var keys = k;
    if (!Array.isArray(keys)) keys = [keys];
    if (!isEmptyObject(obj) && keys[0] in obj && keys && keys.length > 1) {
        return getPropertyValue(obj[keys[0]], keys.slice(1));
    }
    // else return clone of object to avoid overwriting data
    return obj ? cloneObject(obj[keys[0]]) : undefined;
};

var handleHash = function handleHash() {
    var hash = window.location.hash;
    if (hash) {
        document.querySelector('a[href="' + hash + '"]').click();
    }
};

var clearable = function clearable(element) {
    element.addClass('clear');
    document.addEventListener('mousemove', function (e) {
        if (/clear/.test(e.target.classList)) {
            e.stopPropagation();
            e.target.toggleClass('onClear', e.target.offsetWidth - 18 < e.clientX - e.target.getBoundingClientRect().left);
        }
    });
    document.addEventListener('mousedown', function (e) {
        if (/onClear/.test(e.target.classList)) {
            e.stopPropagation();
            e.target.setAttribute('data-value', '');
            e.target.classList.remove('clear', 'onClear');
            e.target.value = '';
            e.target.dispatchEvent(new Event('change'));
        }
    });
};

/**
 * Creates a DOM element and adds any attributes to it.
 *
 * @param {String} tag_name: the tag to create, e.g. 'div', 'a', etc
 * @param {Object} attributes: all the attributes to assign, e.g. { id: '...', class: '...', html: '...', ... }
 * @return the created DOM element
 */
var createElement = function createElement(tag_name) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = document.createElement(tag_name);
    Object.keys(attributes).forEach(function (attr) {
        var value = attributes[attr];
        if (attr === 'text') {
            el.textContent = value;
        } else if (attr === 'html') {
            el.html(value);
        } else {
            el.setAttribute(attr, value);
        }
    });
    return el;
};

/**
 * Apply function to all elements based on selector passed
 *
 * @param {String|Element} selector: selector of the elements to apply the function to, e.g. '.class', '#id', 'tag', etc
 * can also be a DOM element
 * @param {Function} funcToRun: function to apply
 * @param {String} func_selector: method of finding the selector, optional
 * @param {Element} el_parent: parent of the selector, document by default
 */
var applyToAllElements = function applyToAllElements(selector, funcToRun, func_selector, el_parent) {
    if (!selector || !funcToRun) {
        return;
    }

    var function_selector = func_selector;
    var element_to_select = selector;
    if (!func_selector && !element_to_select.nodeName) {
        if (/[\s#]/.test(element_to_select) || element_to_select.lastIndexOf('.') !== 0) {
            function_selector = 'querySelectorAll';
        } else if (element_to_select.lastIndexOf('.') === 0) {
            function_selector = 'getElementsByClassName';
            element_to_select = element_to_select.substring(1);
        } else if (/^[a-zA-Z]+$/.test(element_to_select)) {
            function_selector = 'getElementsByTagName';
        }
    }
    var parent_element = el_parent || document;
    var el = element_to_select.nodeName || (typeof element_to_select === 'undefined' ? 'undefined' : _typeof(element_to_select)) === 'object' ? element_to_select : parent_element[function_selector](element_to_select);
    for (var i = 0; i < el.length; i++) {
        funcToRun(el[i]);
    }
};

/**
 * Returns the first parent element that matches the selector (including el itself)
 *
 * @param {Element} el      : element to start looking for parent
 * @param {String}  selector: selector to find the element that matches to, e.g. '.class', '#id', 'tag', or a combination of them
 */
var findParent = function findParent(el, selector) {
    if (el && el.nodeName !== 'BODY' && typeof el.matches === 'function') {
        return el.matches(selector) ? el : findParent(el.parentNode, selector);
    }
    return null;
};

var static_hash = void 0;
var getStaticHash = function getStaticHash() {
    static_hash = static_hash || (document.querySelector('script[src*="vendor.min.js"]').getAttribute('src') || '').split('?')[1];
    return static_hash;
};

module.exports = {
    showLoadingImage: showLoadingImage,
    getHighestZIndex: getHighestZIndex,
    downloadCSV: downloadCSV,
    template: template,
    isEmptyObject: isEmptyObject,
    cloneObject: cloneObject,
    isDeepEqual: isDeepEqual,
    getPropertyValue: getPropertyValue,
    handleHash: handleHash,
    clearable: clearable,
    createElement: createElement,
    applyToAllElements: applyToAllElements,
    findParent: findParent,
    getStaticHash: getStaticHash
};

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(92);

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tooltip = __webpack_require__(380);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fieldset = function (_React$PureComponent) {
    _inherits(Fieldset, _React$PureComponent);

    function Fieldset() {
        _classCallCheck(this, Fieldset);

        return _possibleConstructorReturn(this, (Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).apply(this, arguments));
    }

    _createClass(Fieldset, [{
        key: 'render',
        value: function render() {
            var field_left_class = (0, _classnames2.default)('field-info left', { icon: this.props.icon }, this.props.icon);
            var header_time = void 0;
            if (this.props.time) {
                header_time = (0, _moment2.default)(this.props.time || undefined).utc().format('YYYY-MM-DD HH:mm:ss [GMT]');
            }
            return _react2.default.createElement(
                'fieldset',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'fieldset-header' },
                    _react2.default.createElement(
                        'span',
                        { className: field_left_class },
                        this.props.header
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'field-info right' },
                        header_time,
                        _react2.default.createElement(_tooltip2.default, {
                            alignment: 'left',
                            is_icon: true,
                            message: this.props.tooltip || 'Message goes here.'
                        })
                    )
                ),
                this.props.children
            );
        }
    }]);

    return Fieldset;
}(_react2.default.PureComponent);

Fieldset.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    header: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    time: _propTypes2.default.object,
    tooltip: _propTypes2.default.string
};

exports.default = Fieldset;

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _duration = __webpack_require__(389);

var _dao = __webpack_require__(91);

var _dao2 = _interopRequireDefault(_dao);

var _language = __webpack_require__(15);

var _localize = __webpack_require__(2);

var _utility = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContractType = function () {
    var _contract_categories;

    /**
     * components can be undef or an array containing any of: 'start_date', 'barrier', 'last_digit'
     *     ['duration', 'amount'] are omitted, as they're available in all contract types
     */
    var contract_types = {
        rise_fall: { title: (0, _localize.localize)('Rise/Fall'), trade_types: ['CALL', 'PUT'], components: ['start_date'], barrier_count: 0 },
        high_low: { title: (0, _localize.localize)('Higher/Lower'), trade_types: ['CALL', 'PUT'], components: ['barrier'], barrier_count: 1 },
        touch: { title: (0, _localize.localize)('Touch/No Touch'), trade_types: ['ONETOUCH', 'NOTOUCH'], components: ['barrier'] },
        end: { title: (0, _localize.localize)('Ends Between/Ends Outside'), trade_types: ['EXPIRYMISS', 'EXPIRYRANGE'], components: ['barrier'] },
        stay: { title: (0, _localize.localize)('Stays Between/Goes Outside'), trade_types: ['RANGE', 'UPORDOWN'], components: ['barrier'] },
        asian: { title: (0, _localize.localize)('Asians'), trade_types: ['ASIANU', 'ASIAND'], components: [] },
        match_diff: { title: (0, _localize.localize)('Matches/Differs'), trade_types: ['DIGITMATCH', 'DIGITDIFF'], components: ['last_digit'] },
        even_odd: { title: (0, _localize.localize)('Even/Odd'), trade_types: ['DIGITODD', 'DIGITEVEN'], components: [] },
        over_under: { title: (0, _localize.localize)('Over/Under'), trade_types: ['DIGITOVER', 'DIGITUNDER'], components: ['last_digit'] },
        lb_call: { title: (0, _localize.localize)('High-Close'), trade_types: ['LBFLOATCALL'], components: [] },
        lb_put: { title: (0, _localize.localize)('Close-Low'), trade_types: ['LBFLOATPUT'], components: [] },
        lb_high_low: { title: (0, _localize.localize)('High-Low'), trade_types: ['LBHIGHLOW'], components: [] }
    };

    var contract_categories = (_contract_categories = {}, _defineProperty(_contract_categories, (0, _localize.localize)('Up/Down'), ['rise_fall', 'high_low']), _defineProperty(_contract_categories, (0, _localize.localize)('Touch/No Touch'), ['touch']), _defineProperty(_contract_categories, (0, _localize.localize)('In/Out'), ['end', 'stay']), _defineProperty(_contract_categories, (0, _localize.localize)('Asians'), ['asian']), _defineProperty(_contract_categories, (0, _localize.localize)('Digits'), ['match_diff', 'even_odd', 'over_under']), _defineProperty(_contract_categories, (0, _localize.localize)('Lookback'), ['lb_call', 'lb_put', 'lb_high_low']), _contract_categories);

    var available_contract_types = {};
    var available_categories = {};

    var buildContractTypesConfig = function buildContractTypesConfig(symbol) {
        return _dao2.default.getContractsFor(symbol).then(function (r) {
            available_contract_types = {};
            available_categories = (0, _utility.cloneObject)(contract_categories); // To preserve the order (will clean the extra items later in this function)
            r.contracts_for.available.forEach(function (contract) {
                var type = Object.keys(contract_types).find(function (key) {
                    return contract_types[key].trade_types.indexOf(contract.contract_type) !== -1 && (typeof contract_types[key].barrier_count === 'undefined' || +contract_types[key].barrier_count === contract.barriers) // To distinguish betweeen Rise/Fall & Higher/Lower
                    ;
                });

                if (!type || Exceptions.isExcluded(type)) return; // ignore unsupported/excepted contract types

                /*
                add to this config if a value you are looking for does not exist yet
                accordingly create a function to retrieve the value
                config: {
                    has_spot: 1,
                    durations: {
                        min_max: {
                            spot: {
                                tick: {
                                    min: 5, // value in ticks, as cannot convert to seconds
                                    max: 10,
                                },
                                intraday: {
                                    min: 18000, // all values converted to seconds
                                    max: 86400,
                                },
                                daily: {
                                    min: 86400,
                                    max: 432000,
                                },
                            },
                            forward: {
                                intraday: {
                                    min: 18000,
                                    max: 86400,
                                },
                            },
                        },
                        units_display: {
                            spot: [
                                { text: 'ticks',   value: 't' },
                                { text: 'seconds', value: 's' },
                                { text: 'minutes', value: 'm' },
                                { text: 'hours',   value: 'h' },
                                { text: 'days',    value: 'd' },
                            ],
                            forward: [
                                { text: 'days',    value: 'd' },
                            ],
                        },
                    },
                    forward_starting_dates: [
                        { text: 'Mon - 19 Mar, 2018', open: 1517356800, close: 1517443199 },
                        { text: 'Tue - 20 Mar, 2018', open: 1517443200, close: 1517529599 },
                        { text: 'Wed - 21 Mar, 2018', open: 1517529600, close: 1517615999 },
                    ],
                    trade_types: {
                        'CALL': 'Higher',
                        'PUT' : 'Lower',
                    },
                    barriers: {
                        intraday: {
                            high_barrier: '+2.12',
                            low_barrier : '-1.12',
                        },
                        daily: {
                            high_barrier: 1111,
                            low_barrier : 1093,
                        }
                    }
                }
                */

                if (!available_contract_types[type]) {
                    // extend contract_categories to include what is needed to create the contract list
                    var sub_cats = available_categories[Object.keys(available_categories).find(function (key) {
                        return available_categories[key].indexOf(type) !== -1;
                    })];
                    sub_cats[sub_cats.indexOf(type)] = { value: type, text: (0, _localize.localize)(contract_types[type].title) };

                    // populate available contract types
                    available_contract_types[type] = (0, _utility.cloneObject)(contract_types[type]);
                }
                var config = available_contract_types[type].config || {};

                // ----- has_spot -----
                if (contract.start_type === 'spot') {
                    config.has_spot = 1;
                }

                // ----- durations -----
                if (contract.min_contract_duration && contract.max_contract_duration) {
                    config.durations = (0, _duration.buildDurationConfig)(config.durations, contract);
                }

                // ----- forward_starting_dates -----
                if (contract.forward_starting_options) {
                    config.forward_starting_dates = contract.forward_starting_options.map(function (option) {
                        return {
                            text: _moment2.default.unix(option.open).format('ddd - DD MMM, YYYY'),
                            value: option.open,
                            end: option.close
                        };
                    });
                }

                // ----- trade_types -----
                if (contract.contract_display && contract.contract_type) {
                    config.trade_types = Object.assign(config.trade_types || {}, _defineProperty({}, contract.contract_type, contract.contract_display));
                }

                // ----- barriers -----
                if (contract.barriers) {
                    var obj_barrier = {};
                    ['barrier', 'low_barrier', 'high_barrier'].forEach(function (field) {
                        if (field in contract) obj_barrier[field] = contract[field];
                    });
                    config.barriers = Object.assign(config.barriers || {}, _defineProperty({}, contract.expiry_type, obj_barrier));
                }

                available_contract_types[type].config = config;
            });

            // cleanup categories
            Object.keys(available_categories).forEach(function (key) {
                available_categories[key] = available_categories[key].filter(function (item) {
                    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object';
                });
                if (available_categories[key].length === 0) {
                    delete available_categories[key];
                }
            });
        });
    };

    var getContractValues = function getContractValues(contract_type, contract_expiry_type, duration_unit) {
        var form_components = getComponents(contract_type);
        var obj_trade_types = getTradeTypes(contract_type);
        var obj_start_dates = getStartDates(contract_type);
        var obj_start_type = getStartType(obj_start_dates.start_date);
        var obj_barrier = getBarriers(contract_type, contract_expiry_type);
        var obj_duration_unit = getDurationUnit(duration_unit, contract_type, obj_start_type.contract_start_type);

        var obj_duration_units_list = getDurationUnitsList(contract_type, obj_start_type.contract_start_type);

        return _extends({}, form_components, obj_trade_types, obj_start_dates, obj_start_type, obj_barrier, obj_duration_units_list, obj_duration_unit);
    };

    var getContractType = function getContractType(list, contract_type) {
        var list_arr = Object.keys(list || {}).reduce(function (k, l) {
            return [].concat(_toConsumableArray(k), _toConsumableArray(list[l].map(function (ct) {
                return ct.value;
            })));
        }, []);
        return {
            contract_type: list_arr.indexOf(contract_type) === -1 || !contract_type ? list_arr[0] : contract_type
        };
    };

    var getComponents = function getComponents(c_type) {
        return { form_components: ['duration', 'amount'].concat(_toConsumableArray(contract_types[c_type].components)) };
    };

    var getDurationUnitsList = function getDurationUnitsList(contract_type, contract_start_type) {
        var duration_units_list = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'durations', 'units_display', contract_start_type]) || [];

        return { duration_units_list: duration_units_list };
    };

    var getDurationUnit = function getDurationUnit(duration_unit, contract_type, contract_start_type) {
        var duration_units = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'durations', 'units_display', contract_start_type]) || [];
        var arr_units = [];
        duration_units.forEach(function (obj) {
            arr_units.push(obj.value);
        });

        return {
            duration_unit: !duration_unit || arr_units.indexOf(duration_unit) === -1 ? arr_units[0] : duration_unit
        };
    };

    // TODO: use this getter function to dynamically compare min/max versus duration amount
    var getDurationMinMax = function getDurationMinMax(contract_type, contract_start_type, contract_expiry_type) {
        var duration_min_max = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'durations', 'min_max', contract_start_type, contract_expiry_type]) || {};

        return { duration_min_max: duration_min_max };
    };

    var getStartType = function getStartType(start_date) {
        var contract_start_type = start_date === 'now' ? 'spot' : 'forward';

        return { contract_start_type: contract_start_type };
    };

    var getStartDates = function getStartDates(contract_type) {
        var config = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config']);
        var start_dates_list = [];

        if (config.has_spot) {
            start_dates_list.push({ text: (0, _localize.localize)('Now'), value: 'now' });
        }
        if (config.forward_starting_dates) {
            start_dates_list.push.apply(start_dates_list, _toConsumableArray(config.forward_starting_dates));
        }

        var start_date = start_dates_list[0].value;

        return { start_date: start_date, start_dates_list: start_dates_list };
    };

    var getTradeTypes = function getTradeTypes(contract_type) {
        return {
            trade_types: (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'trade_types'])
        };
    };

    var getBarriers = function getBarriers(contract_type, expiry_type) {
        var barriers = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'barriers', expiry_type]) || {};
        var barrier_1 = barriers.barrier || barriers.high_barrier || '';
        var barrier_2 = barriers.low_barrier || '';
        return {
            barrier_1: barrier_1.toString(),
            barrier_2: barrier_2.toString()
        };
    };

    return {
        buildContractTypesConfig: buildContractTypesConfig,
        getContractValues: getContractValues,
        getContractType: getContractType,
        getDurationUnitsList: getDurationUnitsList,
        getDurationUnit: getDurationUnit,
        getDurationMinMax: getDurationMinMax,
        getStartType: getStartType,
        getBarriers: getBarriers,

        getContractCategories: function getContractCategories() {
            return available_categories;
        }
    };
}();

var Exceptions = function () {
    var isIDLanguage = function isIDLanguage() {
        return (0, _language.get)() === 'ID';
    };

    // if the exception value is true, then it is excluded
    var exceptions = {
        even_odd: isIDLanguage,
        over_under: isIDLanguage
    };

    return {
        isExcluded: function isExcluded(key) {
            return exceptions[key] ? exceptions[key]() : false;
        }
    };
}();

exports.default = ContractType;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(7);
var urlForStatic = __webpack_require__(9).urlForStatic;
var getStaticHash = __webpack_require__(1).getStaticHash;

// only reload if it's more than 10 minutes since the last reload
var shouldForceReload = function shouldForceReload(last_reload) {
    return !last_reload || +last_reload + 10 * 60 * 1000 < moment().valueOf();
};

// calling this method is handled by GTM tags
var checkNewRelease = function checkNewRelease() {
    var last_reload = localStorage.getItem('new_release_reload_time');
    if (!shouldForceReload(last_reload)) return false;
    localStorage.setItem('new_release_reload_time', moment().valueOf());

    var current_hash = getStaticHash();
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (+xhttp.readyState === 4 && +xhttp.status === 200) {
            var latest_hash = xhttp.responseText;
            if (latest_hash && current_hash && latest_hash !== current_hash) {
                window.location.reload(true);
            }
        }
    };
    xhttp.open('GET', urlForStatic('version?' + Math.random().toString(36).slice(2)), true);
    xhttp.send();

    return true;
};

module.exports = {
    shouldForceReload: shouldForceReload,
    checkNewRelease: checkNewRelease
};

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$PureComponent) {
    _inherits(Dropdown, _React$PureComponent);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.handleVisibility = _this.handleVisibility.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        _this.state = {
            is_list_visible: false
        };
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'isOneLevel',
        value: function isOneLevel() {
            return Array.isArray(this.props.list);
        }
    }, {
        key: 'getDisplayText',
        value: function getDisplayText(list, value) {
            var findInArray = function findInArray(arr_list) {
                return (arr_list.find(function (item) {
                    return item.value === value;
                }) || {}).text;
            };
            var text = '';
            if (this.isOneLevel(list)) {
                text = findInArray(list);
            } else {
                Object.keys(list).some(function (key) {
                    text = findInArray(list[key]);
                    return text;
                });
            }
            return text;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(item) {
            if (item.value !== this.props.value) {
                this.props.onChange({ target: { name: this.props.name, value: item.value } });
            }
            this.handleVisibility();
        }
    }, {
        key: 'setWrapperRef',
        value: function setWrapperRef(node) {
            this.wrapper_ref = node;
        }
    }, {
        key: 'scrollToggle',
        value: function scrollToggle(state) {
            this.is_open = state;
            // Used to disable y-scroll on body - disabled in this component for now
            // document.body.classList.toggle('no-scroll', this.is_open);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(event) {
            if (this.wrapper_ref && !this.wrapper_ref.contains(event.target) && this.state.is_list_visible) {
                this.setState({ is_list_visible: false });
                this.scrollToggle(this.state.is_list_visible);
            }
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({ is_list_visible: !this.state.is_list_visible });
            this.scrollToggle(!this.state.is_list_visible);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.is_nativepicker) {
                return _react2.default.createElement(NativeSelect, {
                    name: this.props.name,
                    value: this.props.value,
                    list: this.props.list,
                    onChange: this.props.onChange
                });
            }
            return _react2.default.createElement(
                'div',
                {
                    ref: this.setWrapperRef,
                    className: 'dropdown-container ' + (this.props.className ? this.props.className : '') + ' ' + (this.state.is_list_visible ? 'show' : '')
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'dropdown-display ' + (this.state.is_list_visible ? 'clicked' : ''),
                        onClick: this.handleVisibility,
                        onBlur: this.handleVisibility
                    },
                    _react2.default.createElement(
                        'span',
                        { name: this.props.name, value: this.props.value },
                        this.getDisplayText(this.props.list, this.props.value)
                    )
                ),
                _react2.default.createElement('span', { className: 'select-arrow' }),
                _react2.default.createElement(
                    'div',
                    { className: 'dropdown-list' },
                    _react2.default.createElement(
                        'div',
                        { className: 'list-container' },
                        this.isOneLevel(this.props.list) ? _react2.default.createElement(Items, {
                            items: this.props.list,
                            name: this.props.name,
                            value: this.props.value,
                            handleSelect: this.handleSelect,
                            type: this.props.type || undefined
                        }) : Object.keys(this.props.list).map(function (key) {
                            return _react2.default.createElement(
                                _react2.default.Fragment,
                                { key: key },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'list-label' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        key
                                    )
                                ),
                                _react2.default.createElement(Items, {
                                    items: _this2.props.list[key],
                                    name: _this2.props.name,
                                    value: _this2.props.value,
                                    handleSelect: _this2.handleSelect
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Dropdown;
}(_react2.default.PureComponent);

var Items = function Items(_ref) {
    var items = _ref.items,
        name = _ref.name,
        value = _ref.value,
        handleSelect = _ref.handleSelect,
        type = _ref.type;
    return items.map(function (item, idx) {
        return _react2.default.createElement(
            _react2.default.Fragment,
            { key: idx },
            _react2.default.createElement(
                'div',
                {
                    className: 'list-item ' + (value === item.value ? 'selected' : ''),
                    key: idx,
                    name: name,
                    value: item.value,
                    'data-end': type === 'date' && item.end ? item.end : undefined,
                    onClick: handleSelect.bind(null, item)
                },
                _react2.default.createElement(
                    'span',
                    null,
                    item.text
                )
            )
        );
    });
};

var NativeSelect = function NativeSelect(_ref2) {
    var name = _ref2.name,
        value = _ref2.value,
        list = _ref2.list,
        onChange = _ref2.onChange;
    return _react2.default.createElement(
        'div',
        { className: 'select-wrapper' },
        _react2.default.createElement(
            'select',
            { name: name, value: value, onChange: onChange },
            Array.isArray(list) ? list.map(function (item, idx) {
                return _react2.default.createElement(
                    'option',
                    { key: idx, value: item.value },
                    item.text
                );
            }) : Object.keys(list).map(function (key) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    { key: key },
                    _react2.default.createElement(
                        'optgroup',
                        { label: key },
                        list[key].map(function (item, idx) {
                            return _react2.default.createElement(
                                'option',
                                { key: idx, value: item.value },
                                item.text
                            );
                        })
                    )
                );
            })
        )
    );
};

Dropdown.propTypes = {
    className: _propTypes2.default.string,
    is_nativepicker: _propTypes2.default.bool,
    list: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    type: _propTypes2.default.string,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])

};

NativeSelect.propTypes = {
    list: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

exports.default = Dropdown;

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinaryLink = exports.isRouteVisible = exports.BinaryRoutes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(265);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _login = __webpack_require__(38);

var _localize = __webpack_require__(2);

var _trade_app = __webpack_require__(403);

var _trade_app2 = _interopRequireDefault(_trade_app);

var _statement = __webpack_require__(385);

var _statement2 = _interopRequireDefault(_statement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var routes = [{ path: '/', component: _trade_app2.default, exact: true }, { path: '/statement', component: _statement2.default, is_authenticated: true }];

var RouteWithSubRoutes = function RouteWithSubRoutes(route) {
    return _react2.default.createElement(_reactRouterDom.Route, {
        exact: route.exact,
        path: route.path,
        render: function render(props) {
            return route.is_authenticated && !_client_base2.default.isLoggedIn() ? // TODO: update styling of the message below
            _react2.default.createElement(
                'a',
                { href: 'javascript:;', onClick: _login.redirectToLogin },
                (0, _localize.localize)('Please login to view this page.')
            ) : _react2.default.createElement(route.component, _extends({}, props, { routes: route.routes }));
        }
    });
};

var BinaryRoutes = exports.BinaryRoutes = function BinaryRoutes() {
    return routes.map(function (route, idx) {
        return _react2.default.createElement(RouteWithSubRoutes, _extends({ key: idx }, route));
    });
};

var normalizePath = function normalizePath(path) {
    return (/^\//.test(path) ? path : '/' + (path || '')
    );
}; // Default to '/'

var getRouteInfo = function getRouteInfo(path) {
    return routes.find(function (r) {
        return r.path === normalizePath(path);
    });
};

var isRouteVisible = exports.isRouteVisible = function isRouteVisible(path) {
    var route = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getRouteInfo(path);
    return !(route && route.is_authenticated && !_client_base2.default.isLoggedIn());
};

var BinaryLink = function BinaryLink(_ref) {
    var to = _ref.to,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, ['to', 'children']);

    var path = normalizePath(to);
    var route = getRouteInfo(path);

    if (!route) {
        throw new Error('Route not found: ' + to);
    }

    return to ? _react2.default.createElement(
        _reactRouterDom.NavLink,
        _extends({ to: path, activeClassName: 'active', exact: route.exact }, props),
        children
    ) : _react2.default.createElement(
        'a',
        _extends({ href: 'javascript:;' }, props),
        children
    );
};

exports.BinaryLink = BinaryLink;
BinaryLink.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    to: _propTypes2.default.string
};

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BinarySocket = __webpack_require__(53);

/*
 * Monitors the network status and initialises the WebSocket connection
 * 1. online : check the WS status (init/send: blink after timeout, open/message: online)
 * 2. offline: it is offline
 */
var NetworkMonitorBase = function () {
    var _pending_timeouts;

    var status_config = {
        online: { class: 'online', tooltip: 'Online' },
        offline: { class: 'offline', tooltip: 'Offline' },
        blinking: { class: 'blinker', tooltip: 'Connecting to server' }
    };
    var pendings = {};
    var pending_keys = {
        ws_init: 'ws_init',
        ws_request: 'ws_request'
    };
    var pending_timeouts = (_pending_timeouts = {}, _defineProperty(_pending_timeouts, pending_keys.ws_init, 5000), _defineProperty(_pending_timeouts, pending_keys.ws_request, 10000), _pending_timeouts);

    var ws_config = void 0,
        network_status = void 0,
        updateUI = void 0;

    var init = function init(socket_general_functions, fncUpdateUI) {
        updateUI = fncUpdateUI;
        ws_config = Object.assign({ wsEvent: wsEvent, isOnline: isOnline }, socket_general_functions);

        if ('onLine' in navigator) {
            window.addEventListener('online', setStatus);
            window.addEventListener('offline', setStatus);
        } else {
            // if not supported, default to online and fallback to WS checks
            navigator.onLine = true;
        }

        if (isOnline()) {
            BinarySocket.init(ws_config);
        }

        setStatus(isOnline() ? 'online' : 'offline');
    };

    var isOnline = function isOnline() {
        return navigator.onLine;
    };

    var wsReconnect = function wsReconnect() {
        if (isOnline() && BinarySocket.hasReadyState(2, 3)) {
            // CLOSING or CLOSED
            BinarySocket.init(ws_config);
        } else {
            BinarySocket.send({ ping: 1 }); // trigger a request to get stable status sooner
        }
    };

    var setStatus = function setStatus(status) {
        if (!isOnline()) {
            network_status = 'offline';
        } else if (pending_keys[status] || network_status === 'offline') {
            network_status = 'blinking';
            wsReconnect();
        } else {
            network_status = 'online';
        }

        if (typeof updateUI === 'function') {
            updateUI(status_config[network_status], isOnline());
        }
    };

    var ws_events_map = {
        init: function init() {
            return setPending(pending_keys.ws_init);
        },
        open: function open() {
            return clearPendings(pending_keys.ws_init);
        },
        send: function send() {
            return setPending(pending_keys.ws_request);
        },
        message: function message() {
            return clearPendings();
        },
        close: function close() {
            return setPending(pending_keys.ws_init);
        }
    };

    var wsEvent = function wsEvent(event) {
        if (typeof ws_events_map[event] === 'function') {
            ws_events_map[event]();
        }
    };

    var setPending = function setPending(key) {
        if (!pendings[key]) {
            pendings[key] = setTimeout(function () {
                pendings[key] = undefined;
                setStatus(key);
            }, pending_timeouts[key]);
        }
    };

    var clearPendings = function clearPendings(key) {
        var clear = function clear(k) {
            clearTimeout(pendings[k]);
            pendings[k] = undefined;
            if (k === pending_keys.ws_request) {
                setStatus('online');
            }
        };

        if (key) {
            clear(key);
        } else {
            Object.keys(pendings).forEach(clear);
        }
    };

    return {
        init: init,
        wsEvent: wsEvent
    };
}();

module.exports = NetworkMonitorBase;

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
    };
}

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cookies = __webpack_require__(44);
var elementTextContent = __webpack_require__(3).elementTextContent;
var getElementById = __webpack_require__(3).getElementById;
var CookieStorage = __webpack_require__(5).CookieStorage;
var LocalStore = __webpack_require__(5).LocalStore;
var applyToAllElements = __webpack_require__(1).applyToAllElements;

var Language = function () {
    var all_languages = {
        ACH: 'Translations',
        EN: 'English',
        DE: 'Deutsch',
        ES: 'Español',
        FR: 'Français',
        ID: 'Indonesia',
        IT: 'Italiano',
        JA: '日本語',
        PL: 'Polish',
        PT: 'Português',
        RU: 'Русский',
        TH: 'Thai',
        VI: 'Tiếng Việt',
        ZH_CN: '简体中文',
        ZH_TW: '繁體中文'
    };
    var default_language = 'EN';

    var setCookieLanguage = function setCookieLanguage(lang) {
        if (!Cookies.get('language') || lang) {
            var cookie = new CookieStorage('language');
            cookie.write((lang || getLanguage()).toUpperCase());
        }
    };

    var url_lang = null;

    var lang_regex = new RegExp('^(' + Object.keys(all_languages).join('|') + ')$', 'i');

    var languageFromUrl = function languageFromUrl(custom_url) {
        if (url_lang && !custom_url) return url_lang;
        var url_params = (custom_url || window.location.href).split('/').slice(3);
        var language = url_params.find(function (lang) {
            return lang_regex.test(lang);
        }) || '';
        if (!custom_url) {
            url_lang = language;
        }
        return language;
    };

    var current_lang = null;

    var getLanguage = function getLanguage() {
        if (/ach/i.test(current_lang) || /ach/i.test(languageFromUrl())) {
            var crowdin_lang = Cookies.get('jipt_language_code_binary-static'); // selected language for in-context translation
            if (crowdin_lang) {
                current_lang = crowdin_lang.toUpperCase().replace('-', '_').toUpperCase();
                if (document.body) {
                    document.body.classList.add(current_lang); // set the body class removed by crowdin code
                }
            }
        }
        current_lang = current_lang || (languageFromUrl() || Cookies.get('language') || default_language).toUpperCase();
        return current_lang;
    };

    var urlForLanguage = function urlForLanguage(lang) {
        var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
        return url.replace(new RegExp('/' + getLanguage() + '/', 'i'), '/' + (lang || default_language).trim().toLowerCase() + '/');
    };

    var onChangeLanguage = function onChangeLanguage() {
        applyToAllElements('li', function (el) {
            el.addEventListener('click', function (e) {
                if (e.target.nodeName !== 'LI') return;
                var lang = e.target.getAttribute('class');
                if (getLanguage() === lang) return;
                elementTextContent(getElementById('display_language').getElementsByClassName('language'), e.target.textContent);
                LocalStore.remove('ws_cache');
                setCookieLanguage(lang);
                document.location = urlForLanguage(lang);
            });
        }, '', getElementById('select_language'));
    };

    return {
        getAll: function getAll() {
            return all_languages;
        },
        setCookie: setCookieLanguage,
        get: getLanguage,
        onChange: onChangeLanguage,
        urlFor: urlForLanguage,
        urlLang: languageFromUrl,
        reset: function reset() {
            url_lang = null;current_lang = null;
        }
    };
}();

module.exports = Language;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputField = function (_React$PureComponent) {
    _inherits(InputField, _React$PureComponent);

    function InputField() {
        _classCallCheck(this, InputField);

        return _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).apply(this, arguments));
    }

    _createClass(InputField, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'input-field ' + (this.props.className ? this.props.className : '') },
                !!this.props.label && _react2.default.createElement(
                    'label',
                    { htmlFor: this.props.name, className: 'input-label' },
                    this.props.label
                ),
                !!this.props.prefix && _react2.default.createElement(
                    'i',
                    null,
                    _react2.default.createElement('span', { className: 'symbols ' + this.props.prefix.toLowerCase() })
                ),
                _react2.default.createElement('input', {
                    type: this.props.type,
                    name: this.props.name,
                    step: this.props.is_currency ? '0.01' : undefined,
                    placeholder: this.props.placeholder || undefined,
                    disabled: this.props.is_disabled,
                    value: this.props.value,
                    onChange: this.props.onChange,
                    required: this.props.required || undefined
                }),
                !!this.props.helper && _react2.default.createElement(
                    'span',
                    { className: 'input-helper' },
                    this.props.helper
                )
            );
        }
    }]);

    return InputField;
}(_react2.default.PureComponent);

InputField.propTypes = {
    className: _propTypes2.default.string,
    helper: _propTypes2.default.bool,
    is_currency: _propTypes2.default.bool,
    is_disabled: _propTypes2.default.string,
    is_nativepicker: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    name: _propTypes2.default.string,
    number: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    placeholder: _propTypes2.default.string,
    prefix: _propTypes2.default.string,
    required: _propTypes2.default.bool,
    type: _propTypes2.default.string,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

exports.default = InputField;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(7);
var checkInput = __webpack_require__(3).checkInput;

var toTitleCase = function toTitleCase(str) {
    return (str || '').replace(/\w[^\s/\\]*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

var toISOFormat = function toISOFormat(date) {
    return date instanceof moment ? date.format('YYYY-MM-DD') : '';
};

var toReadableFormat = function toReadableFormat(date) {
    if (date instanceof moment) {
        if (window.innerWidth < 770 && checkInput('date', 'not-a-date')) {
            return toISOFormat(date);
        }
        return date.format('DD MMM, YYYY');
    }
    return '';
};

var padLeft = function padLeft(txt, len, char) {
    var text = String(txt || '');
    return text.length >= len ? text : '' + Array(len - text.length + 1).join(char) + text;
};

var compareBigUnsignedInt = function compareBigUnsignedInt(a, b) {
    var first_num = numberToString(a);
    var second_num = numberToString(b);
    if (!first_num || !second_num) {
        return '';
    }
    var max_length = Math.max(first_num.length, second_num.length);
    first_num = padLeft(first_num, max_length, '0');
    second_num = padLeft(second_num, max_length, '0');

    // lexicographical comparison
    var order = 0;
    if (first_num !== second_num) {
        order = first_num > second_num ? 1 : -1;
    }

    return order;
};

var numberToString = function numberToString(n) {
    return typeof n === 'number' ? String(n) : n;
};

module.exports = {
    toISOFormat: toISOFormat,
    toReadableFormat: toReadableFormat,
    toTitleCase: toTitleCase,
    padLeft: padLeft,
    numberToString: numberToString,

    compareBigUnsignedInt: compareBigUnsignedInt
};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(7);
var template = __webpack_require__(1).template;

var Localize = function () {
    var localized_texts = void 0;

    var localizeForLang = function localizeForLang(lang) {
        localized_texts = texts_json[lang.toUpperCase()];
        moment.locale(lang.toLowerCase());
    };

    var doLocalize = function doLocalize(txt, params) {
        var text = txt;

        var index = text.replace(/[\s|.]/g, '_');

        text = localized_texts && localized_texts[index] || text;

        // only use template when explicitly required
        return params ? template(text, params) : text;
    };

    var localize = function localize(text, params) {
        return Array.isArray(text) ? text.map(function (t) {
            return doLocalize(t, params);
        }) : doLocalize(text, params);
    };

    return {
        localize: localize,
        forLang: localizeForLang
    };
}();

module.exports = Localize;

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
    var id = _ref.id,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        text = _ref.text,
        has_effect = _ref.has_effect,
        is_disabled = _ref.is_disabled,
        handleClick = _ref.handleClick;

    var classes = 'btn' + (has_effect ? ' effect' : '') + ' ' + className;
    return _react2.default.createElement(
        'button',
        { id: id, className: classes, onClick: handleClick || undefined, disabled: is_disabled },
        _react2.default.createElement(
            'span',
            null,
            text
        )
    );
};

Button.propTypes = {
    className: _propTypes2.default.string,
    handleClick: _propTypes2.default.func,
    has_effect: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    is_disabled: _propTypes2.default.bool,
    text: _propTypes2.default.string
};

exports.default = Button;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(92);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _arrowhead = __webpack_require__(373);

var _arrowhead2 = _interopRequireDefault(_arrowhead);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.getDays = _this.getDays.bind(_this);
        _this.getDates = _this.getDates.bind(_this);
        _this.getMonths = _this.getMonths.bind(_this);
        _this.getYears = _this.getYears.bind(_this);
        _this.getDecades = _this.getDecades.bind(_this);

        _this.setToday = _this.setToday.bind(_this);
        _this.setActiveView = _this.setActiveView.bind(_this);

        _this.nextMonth = _this.nextMonth.bind(_this);
        _this.previousMonth = _this.previousMonth.bind(_this);

        _this.nextYear = _this.nextYear.bind(_this);
        _this.previousYear = _this.previousYear.bind(_this);

        _this.nextDecade = _this.nextDecade.bind(_this);
        _this.previousDecade = _this.previousDecade.bind(_this);

        _this.nextCentury = _this.nextCentury.bind(_this);
        _this.previousCentury = _this.previousCentury.bind(_this);

        _this.handleDateSelected = _this.handleDateSelected.bind(_this);
        _this.handleMonthSelected = _this.handleMonthSelected.bind(_this);
        _this.handleYearSelected = _this.handleYearSelected.bind(_this);
        _this.handleDecadeSelected = _this.handleDecadeSelected.bind(_this);

        _this.onChangeInput = _this.onChangeInput.bind(_this);
        _this.resetCalendar = _this.resetCalendar.bind(_this);

        var startDate = props.startDate,
            minDate = props.minDate,
            initial_value = props.initial_value;


        var current_date = (0, _moment2.default)(startDate || minDate).format(_this.props.dateFormat);

        _this.state = {
            date: current_date, // calendar dates reference
            selected_date: initial_value !== undefined ? initial_value : current_date // selected date
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ active_view: 'date' });
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.state.active_view !== nextState.active_view || this.state.date !== nextState.date || this.state.selected_date !== nextState.selected_date || this.props.minDate !== nextState.minDate || this.props.maxDate !== nextState.maxDate || this.props.startDate !== nextState.startDate;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var date = (0, _moment2.default)(this.state.date);

            if (date.isBefore((0, _moment2.default)(nextProps.minDate))) {
                this.setState({
                    date: nextProps.minDate
                });
            } else if (date.isAfter((0, _moment2.default)(nextProps.maxDate))) {
                this.setState({
                    date: nextProps.maxDate
                });
            }
        }
    }, {
        key: 'setToday',
        value: function setToday() {
            var now = (0, _moment2.default)().format(this.props.dateFormat);
            this.setState({
                date: now,
                selected_date: now,
                active_view: 'date'
            });
            this.props.handleDateChange(now, true);
        }
    }, {
        key: 'updateDate',
        value: function updateDate(value, unit, is_add) {
            var new_date = (0, _moment2.default)(this.state.date)[is_add ? 'add' : 'subtract'](value, unit).format(this.props.dateFormat);

            if (unit === 'months' && this.isPeriodDisabled(new_date, 'month')) return;

            if (unit === 'years' && this.isPeriodDisabled(new_date, 'month')) {
                new_date = is_add ? this.props.maxDate : this.props.minDate;
            }

            this.setState({ date: new_date });
        }
    }, {
        key: 'isPeriodDisabled',
        value: function isPeriodDisabled(date, unit) {
            var start_of_period = (0, _moment2.default)(date).startOf(unit);
            var end_of_period = (0, _moment2.default)(date).endOf(unit);
            return end_of_period.isBefore((0, _moment2.default)(this.props.minDate)) || start_of_period.isAfter((0, _moment2.default)(this.props.maxDate));
        }
    }, {
        key: 'nextMonth',
        value: function nextMonth() {
            this.updateDate(1, 'months', true);
        }
    }, {
        key: 'previousMonth',
        value: function previousMonth() {
            this.updateDate(1, 'months', false);
        }
    }, {
        key: 'nextYear',
        value: function nextYear() {
            this.updateDate(1, 'years', true);
        }
    }, {
        key: 'previousYear',
        value: function previousYear() {
            this.updateDate(1, 'years', false);
        }
    }, {
        key: 'nextDecade',
        value: function nextDecade() {
            this.updateDate(10, 'years', true);
        }
    }, {
        key: 'previousDecade',
        value: function previousDecade() {
            this.updateDate(10, 'years', false);
        }
    }, {
        key: 'nextCentury',
        value: function nextCentury() {
            this.updateDate(100, 'years', true);
        }
    }, {
        key: 'previousCentury',
        value: function previousCentury() {
            this.updateDate(100, 'years', false);
        }
    }, {
        key: 'setActiveView',
        value: function setActiveView(active_view) {
            this.setState({ active_view: active_view });
        }
    }, {
        key: 'handleDateSelected',
        value: function handleDateSelected(e) {
            var date = (0, _moment2.default)(e.target.dataset.date);
            var min_date = (0, _moment2.default)(this.props.minDate).format(this.props.dateFormat);
            var max_date = (0, _moment2.default)(this.props.maxDate).format(this.props.dateFormat);
            var is_before = date.isBefore(min_date);
            var is_after = date.isAfter(max_date);

            if (is_before || is_after) return;

            var formatted_date = date.format(this.props.dateFormat);
            this.setState({
                date: formatted_date,
                selected_date: formatted_date
            });
            this.props.handleDateChange(formatted_date);
        }
    }, {
        key: 'updateSelected',
        value: function updateSelected(e, type) {
            var active_view = {
                month: 'date',
                year: 'month',
                decade: 'year'
            };
            var date = (0, _moment2.default)(this.state.date)[type === 'decade' ? 'year' : type](e.target.dataset[type].split('-')[0]).format(this.props.dateFormat);

            if (this.isPeriodDisabled(date, type)) return;

            this.setState({
                date: date,
                active_view: active_view[type]
            });
        }
    }, {
        key: 'handleMonthSelected',
        value: function handleMonthSelected(e) {
            this.updateSelected(e, 'month');
        }
    }, {
        key: 'handleYearSelected',
        value: function handleYearSelected(e) {
            this.updateSelected(e, 'year');
        }
    }, {
        key: 'handleDecadeSelected',
        value: function handleDecadeSelected(e) {
            this.updateSelected(e, 'decade');
        }
    }, {
        key: 'onChangeInput',
        value: function onChangeInput(e) {
            var value = e.target.value;

            if (this.props.mode === 'duration' && value) {
                value = (0, _moment2.default)().add(value || 1, 'days');
            }

            this.setState({ selected_date: value }); // update calendar input

            if ((0, _moment2.default)(value, 'YYYY-MM-DD', true).isValid() || !value) {
                this.props.handleDateChange(value, true);

                if (!value) {
                    var _props = _extends({}, this.props),
                        startDate = _props.startDate,
                        minDate = _props.minDate;

                    var currentDate = (0, _moment2.default)(startDate || minDate).format(this.props.dateFormat);
                    this.setState({ date: currentDate });
                } else {
                    this.setState({ date: (0, _moment2.default)(value).format(this.props.dateFormat) }); // update calendar dates
                }
            }
        }
    }, {
        key: 'resetCalendar',
        value: function resetCalendar() {
            var _props2 = this.props,
                startDate = _props2.startDate,
                minDate = _props2.minDate;

            var default_date = (0, _moment2.default)(startDate || minDate).format(this.props.dateFormat);

            this.setState({
                date: default_date,
                selected_date: ''
            });
        }
    }, {
        key: 'getDays',
        value: function getDays() {
            var _this2 = this;

            var dates = [];
            var days = [];
            var num_of_days = (0, _moment2.default)(this.state.date).daysInMonth() + 1;
            var start_of_month = (0, _moment2.default)(this.state.date).startOf('month').format(this.props.dateFormat);
            var end_of_month = (0, _moment2.default)(this.state.date).endOf('month').format(this.props.dateFormat);
            var first_day = (0, _moment2.default)(start_of_month).day();
            var last_day = (0, _moment2.default)(end_of_month).day();

            var pad = function pad(value) {
                return ('0' + value).substr(-2);
            }; // pad zero

            for (var i = first_day; i > 0; i--) {
                dates.push((0, _moment2.default)(start_of_month).subtract(i, 'day').format(this.props.dateFormat));
            }
            for (var idx = 1; idx < num_of_days; idx += 1) {
                dates.push((0, _moment2.default)(this.state.date).format(this.props.dateFormat.replace('DD', pad(idx))));
            }
            for (var _i = 1; _i <= 6 - last_day; _i++) {
                dates.push((0, _moment2.default)(end_of_month).add(_i, 'day').format(this.props.dateFormat));
            }

            dates.forEach(function (date) {
                var is_disabled = (0, _moment2.default)(date).isBefore((0, _moment2.default)(_this2.props.minDate)) || (0, _moment2.default)(date).isAfter((0, _moment2.default)(_this2.props.maxDate));
                var is_other_month = (0, _moment2.default)(date).isBefore((0, _moment2.default)(start_of_month)) || (0, _moment2.default)(date).isAfter((0, _moment2.default)(end_of_month));
                var is_active = _this2.state.selected_date && (0, _moment2.default)(date).isSame((0, _moment2.default)(_this2.state.selected_date));
                var is_today = (0, _moment2.default)(date).isSame((0, _moment2.default)().utc(), 'day');

                days.push(_react2.default.createElement(
                    'span',
                    {
                        key: date,
                        className: (0, _classnames2.default)('calendar-date', {
                            active: is_active,
                            today: is_today,
                            disabled: is_disabled,
                            hidden: is_other_month
                        }),
                        onClick: _this2.handleDateSelected,
                        'data-date': date
                    },
                    (0, _moment2.default)(date).date()
                ));
            });

            return days;
        }
    }, {
        key: 'getDates',
        value: function getDates() {
            var days = this.getDays().map(function (day) {
                return day;
            });
            var week_headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

            return _react2.default.createElement(
                'div',
                { className: 'calendar-date-panel' },
                week_headers.map(function (item, idx) {
                    return _react2.default.createElement(
                        'span',
                        { key: idx, className: 'calendar-date-header' },
                        (0, _localize.localize)(item)
                    );
                }),
                days
            );
        }
    }, {
        key: 'getMonths',
        value: function getMonths() {
            var _this3 = this;

            var is_active = (0, _moment2.default)(this.state.selected_date).month();
            var month_headers = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return _react2.default.createElement(
                'div',
                { className: 'calendar-month-panel' },
                month_headers.map(function (item, idx) {
                    var date = (0, _moment2.default)(_this3.state.date).month(item);
                    var is_disabled = _this3.isPeriodDisabled(date, 'month');
                    return _react2.default.createElement(
                        'span',
                        {
                            key: idx,
                            className: (0, _classnames2.default)('calendar-month', {
                                active: idx === is_active,
                                disabled: is_disabled
                            }),
                            onClick: _this3.handleMonthSelected,
                            'data-month': idx
                        },
                        (0, _localize.localize)(item)
                    );
                })
            );
        }
    }, {
        key: 'getYears',
        value: function getYears() {
            var _this4 = this;

            var is_active = (0, _moment2.default)(this.state.selected_date).year();
            var current_year = (0, _moment2.default)(this.state.date).year();
            var years = [];
            for (var year = current_year - 1; year < current_year + 11; year++) {
                years.push(year);
            }
            return _react2.default.createElement(
                'div',
                { className: 'calendar-year-panel' },
                years.map(function (year, idx) {
                    var date = (0, _moment2.default)(_this4.state.date).year(year);
                    var is_disabled = _this4.isPeriodDisabled(date, 'year');
                    return _react2.default.createElement(
                        'span',
                        {
                            key: idx,
                            className: (0, _classnames2.default)('calendar-year', {
                                disabled: is_disabled,
                                active: year === is_active
                            }),
                            onClick: _this4.handleYearSelected,
                            'data-year': year
                        },
                        year
                    );
                })
            );
        }
    }, {
        key: 'getDecades',
        value: function getDecades() {
            var _this5 = this;

            var is_active = (0, _moment2.default)(this.state.selected_date).year();
            var current_year = (0, _moment2.default)(this.state.date).year();
            var decades = [];
            var min_year = current_year - 10;

            for (var i = 0; i < 12; i++) {
                var max_year = min_year + 9;
                var range = min_year + '-' + max_year;
                decades.push(range);
                min_year = max_year + 1;
            }

            return _react2.default.createElement(
                'div',
                { className: 'calendar-decade-panel' },
                decades.map(function (range, idx) {
                    var _range$split = range.split('-'),
                        _range$split2 = _slicedToArray(_range$split, 2),
                        start_year = _range$split2[0],
                        end_year = _range$split2[1];

                    var start_date = (0, _moment2.default)(_this5.state.date).year(start_year);
                    var end_date = (0, _moment2.default)(_this5.state.date).year(end_year);
                    var is_disabled = _this5.isPeriodDisabled(start_date, 'year') && _this5.isPeriodDisabled(end_date, 'year');
                    return _react2.default.createElement(
                        'span',
                        {
                            key: idx,
                            className: (0, _classnames2.default)('calendar-decade', {
                                disabled: is_disabled,
                                active: start_year === is_active
                            }),
                            onClick: _this5.handleDecadeSelected,
                            'data-decade': range
                        },
                        range
                    );
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var view = this.state.active_view;

            var is_date_view = view === 'date';
            var is_month_view = view === 'month';
            var is_year_view = view === 'year';
            var is_decade_view = view === 'decade';

            var BtnPrevMonth = is_date_view && _react2.default.createElement('span', {
                type: 'button',
                className: (0, _classnames2.default)('calendar-prev-month-btn', {
                    hidden: this.isPeriodDisabled((0, _moment2.default)(this.state.date).subtract(1, 'month'), 'month')
                }),
                onClick: this.previousMonth
            });
            var BtnNextMonth = is_date_view && _react2.default.createElement('span', {
                type: 'button',
                className: (0, _classnames2.default)('calendar-next-month-btn', {
                    hidden: this.isPeriodDisabled((0, _moment2.default)(this.state.date).add(1, 'month'), 'month')
                }),
                onClick: this.nextMonth
            });

            var BtnPrevYear = _react2.default.createElement('span', {
                type: 'button',
                className: (0, _classnames2.default)('calendar-prev-year-btn', {
                    hidden: this.isPeriodDisabled((0, _moment2.default)(this.state.date).subtract(1, 'month'), 'month')
                }),
                onClick: function onClick() {
                    return (is_date_view || is_month_view) && _this6.previousYear() || is_year_view && _this6.previousDecade() || is_decade_view && _this6.previousCentury();
                }
            });

            var BtnNextYear = _react2.default.createElement('span', {
                type: 'button',
                className: (0, _classnames2.default)('calendar-next-year-btn', {
                    hidden: this.isPeriodDisabled((0, _moment2.default)(this.state.date).add(1, 'month'), 'month')
                }),
                onClick: function onClick() {
                    return (is_date_view || is_month_view) && _this6.nextYear() || is_year_view && _this6.nextDecade() || is_decade_view && _this6.nextCentury();
                }
            });

            var SelectMonth = is_date_view && _react2.default.createElement(
                'span',
                { type: 'button', className: 'calendar-select-month-btn', onClick: function onClick() {
                        return _this6.setActiveView('month');
                    } },
                (0, _moment2.default)(this.state.date).format('MMM')
            );

            var SelectYear = _react2.default.createElement(
                'span',
                {
                    type: 'button',
                    className: 'calendar-select-year-btn',
                    onClick: function onClick() {
                        return is_date_view || is_month_view ? _this6.setActiveView('year') : _this6.setActiveView('decade');
                    }
                },
                (0, _moment2.default)(this.state.date).year(),
                is_year_view && '-' + (0, _moment2.default)(this.state.date).add(9, 'years').year(),
                is_decade_view && '-' + (0, _moment2.default)(this.state.date).add(99, 'years').year()
            );

            var PanelCalendar = is_date_view && this.getDates() || is_month_view && this.getMonths() || is_year_view && this.getYears() || is_decade_view && this.getDecades();

            var value = this.props.mode === 'duration' ? getDayDifference(this.state.selected_date) : this.state.selected_date;

            return _react2.default.createElement(
                'div',
                { className: 'calendar' },
                _react2.default.createElement('input', {
                    type: 'text',
                    placeholder: this.props.placeholder || (this.props.mode === 'duration' ? (0, _localize.localize)('Select a duration') : (0, _localize.localize)('Select date')),
                    value: value,
                    onChange: this.onChangeInput,
                    className: 'calendar-input'
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'calendar-header' },
                    BtnPrevYear,
                    BtnPrevMonth,
                    _react2.default.createElement(
                        'div',
                        { className: 'calendar-select' },
                        SelectMonth,
                        SelectYear
                    ),
                    BtnNextMonth,
                    BtnNextYear
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'calendar-panel' },
                    PanelCalendar
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'calendar-footer' },
                    this.props.footer && _react2.default.createElement(
                        'span',
                        { className: 'calendar-footer-extra' },
                        this.props.footer
                    ),
                    this.props.showTodayBtn && _react2.default.createElement(
                        'span',
                        { className: 'calendar-footer-btn' },
                        _react2.default.createElement(
                            'a',
                            { role: 'button', onClick: this.setToday },
                            (0, _localize.localize)('Today')
                        )
                    )
                )
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

Calendar.defaultProps = {
    dateFormat: 'YYYY-MM-DD',
    minDate: (0, _moment2.default)(0).utc().format('YYYY-MM-DD'), // by default, minDate is set to Unix Epoch (January 1st 1970)
    maxDate: (0, _moment2.default)().utc().add(120, 'y').format('YYYY-MM-DD') // by default, maxDate is set to 120 years after today
};

var getDayDifference = function getDayDifference(date) {
    var diff = (0, _moment2.default)(date).diff((0, _moment2.default)().utc(), 'days');
    return !date || diff < 0 ? '' : diff + 1;
};

var DatePicker = function (_React$PureComponent) {
    _inherits(DatePicker, _React$PureComponent);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this7 = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this7.changeCallback = function () {
            _this7.props.onChange({ target: { name: _this7.props.name, value: _this7.getPickerValue() } });
        };

        _this7.clearDateInput = function () {
            _this7.setState({ selected_date: '' }, _this7.changeCallback);
            _this7.calendar.resetCalendar();
        };

        _this7.getPickerValue = function () {
            return _this7.props.mode === 'duration' ? getDayDifference(_this7.state.selected_date) : _this7.state.selected_date;
        };

        _this7.handleClickOutside = _this7.handleClickOutside.bind(_this7);
        _this7.handleVisibility = _this7.handleVisibility.bind(_this7);
        _this7.handleDateChange = _this7.handleDateChange.bind(_this7);
        _this7.handleMouseEnter = _this7.handleMouseEnter.bind(_this7);
        _this7.handleMouseLeave = _this7.handleMouseLeave.bind(_this7);

        var selected_date = props.initial_value !== undefined ? props.initial_value : (0, _moment2.default)(_this7.props.minDate).format(_this7.props.dateFormat);

        _this7.state = {
            selected_date: selected_date,
            is_calendar_visible: false,
            is_close_btn_visible: false
        };
        return _this7;
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onChange({ target: { name: this.props.name, value: this.getPickerValue() } });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(e) {
            if (!this.mainNode.contains(e.target) && this.state.is_calendar_visible) {
                this.setState({ is_calendar_visible: false });
            }
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({
                is_calendar_visible: !this.state.is_calendar_visible
            });
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            if (this.getPickerValue()) {
                this.setState({ is_close_btn_visible: true });
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.setState({ is_close_btn_visible: false });
        }
    }, {
        key: 'handleDateChange',
        value: function handleDateChange(selected_date, is_calendar_visible) {
            var value = selected_date;
            if (!(0, _moment2.default)(value).isValid) {
                value = '';
            }

            this.setState({
                selected_date: value,
                is_calendar_visible: is_calendar_visible
            }, this.changeCallback);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var value = this.getPickerValue();
            if (this.props.is_nativepicker) {
                return _react2.default.createElement(
                    'div',
                    { ref: function ref(node) {
                            _this8.mainNode = node;
                        }, className: 'datepicker-container' },
                    _react2.default.createElement('input', {
                        id: this.props.name,
                        name: this.props.name,
                        className: 'datepicker-display',
                        type: 'date',
                        value: value,
                        min: this.props.minDate,
                        max: this.props.maxDate,
                        onChange: function onChange(e) {
                            // fix for ios issue: clear button doesn't work
                            // https://github.com/facebook/react/issues/8938
                            var target = e.nativeEvent.target;
                            function iosClearDefault() {
                                target.defaultValue = '';
                            }
                            window.setTimeout(iosClearDefault, 0);

                            _this8.handleDateChange(e.target.value);
                        }
                    }),
                    _react2.default.createElement(
                        'label',
                        { className: 'datepicker-native-overlay', htmlFor: this.props.name },
                        value || this.props.placeholder,
                        _react2.default.createElement(_arrowhead2.default, { className: 'datepicker-native-overlay__arrowhead' })
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { ref: function ref(node) {
                        _this8.mainNode = node;
                    }, className: 'datepicker-container' },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'datepicker-display-wrapper',
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave
                    },
                    _react2.default.createElement('input', {
                        id: this.props.id,
                        name: this.props.name,
                        className: 'datepicker-display',
                        value: value,
                        readOnly: true,
                        placeholder: this.props.placeholder || (this.props.mode === 'duration' ? (0, _localize.localize)('Select a duration') : (0, _localize.localize)('Select date')),
                        onClick: this.handleVisibility
                    }),
                    _react2.default.createElement('span', {
                        className: (0, _classnames2.default)('picker-calendar-icon', {
                            show: !this.state.is_close_btn_visible
                        }),
                        onClick: this.handleVisibility
                    }),
                    _react2.default.createElement('span', {
                        className: (0, _classnames2.default)('close-circle-icon', {
                            show: this.state.is_close_btn_visible
                        }),
                        onClick: this.clearDateInput
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('datepicker-calendar', {
                            show: this.state.is_calendar_visible
                        })
                    },
                    _react2.default.createElement(Calendar, _extends({
                        ref: function ref(node) {
                            _this8.calendar = node;
                        },
                        handleDateChange: this.handleDateChange
                    }, this.props))
                )
            );
        }
    }]);

    return DatePicker;
}(_react2.default.PureComponent);

DatePicker.defaultProps = {
    dateFormat: 'YYYY-MM-DD',
    mode: 'date'
};

Calendar.propTypes = {
    dateFormat: _propTypes2.default.string,
    footer: _propTypes2.default.string,
    handleDateChange: _propTypes2.default.func,
    id: _propTypes2.default.number,
    initial_value: _propTypes2.default.string,
    is_nativepicker: _propTypes2.default.bool,
    maxDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    minDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    mode: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    showTodayBtn: _propTypes2.default.bool,
    startDate: _propTypes2.default.string
};

DatePicker.propTypes = {
    dateFormat: _propTypes2.default.string,
    id: _propTypes2.default.number,
    initial_value: _propTypes2.default.string,
    is_nativepicker: _propTypes2.default.bool,
    maxDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    minDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    mode: _propTypes2.default.string,
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    placeholder: _propTypes2.default.string,
    showTodayBtn: _propTypes2.default.bool
};

exports.default = DatePicker;

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _iscroll = __webpack_require__(636);

var _iscroll2 = _interopRequireDefault(_iscroll);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
      1. to change to 24 hours format
      2. to handle disabled time period
      3. to handle null as initial value
*/

var TimePickerDropdown = function (_PureComponent) {
    _inherits(TimePickerDropdown, _PureComponent);

    function TimePickerDropdown(props) {
        _classCallCheck(this, TimePickerDropdown);

        var _this = _possibleConstructorReturn(this, (TimePickerDropdown.__proto__ || Object.getPrototypeOf(TimePickerDropdown)).call(this, props));

        _this.clear = function (event) {
            event.stopPropagation();
            _this.resetValues();
            _this.setState({
                hour: undefined,
                minute: undefined,
                meridiem: undefined
            });
            _this.props.onChange('');
        };

        _this.hours = ['12'].concat(_toConsumableArray([].concat(_toConsumableArray(Array(11).keys())).map(function (a) {
            return ('0' + (a + 1)).slice(-2);
        })));
        _this.minutes = [].concat(_toConsumableArray(Array(60).keys())).map(function (a) {
            return ('0' + a).slice(-2);
        });
        _this.meridiem = ['am', 'pm'];
        _this.state = {
            hour: props.value.split(':')[0],
            minute: (props.value.split(':')[1] || '').split(' ')[0],
            meridiem: (props.value.split(':')[1] || '').split(' ')[1] || '',
            is_hour_selected: false,
            is_minute_selected: false,
            is_meridiem_selected: false,
            last_updated_type: null
        };
        _this.selectHour = _this.selectOption.bind(_this, 'hour');
        _this.selectMinute = _this.selectOption.bind(_this, 'minute');
        _this.selectMeridiem = _this.selectOption.bind(_this, 'meridiem');
        _this.saveHourRef = _this.saveRef.bind(_this, 'hour');
        _this.saveMinuteRef = _this.saveRef.bind(_this, 'minute');
        _this.saveMeridiemRef = _this.saveRef.bind(_this, 'meridiem');
        return _this;
    }

    _createClass(TimePickerDropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initIScroll();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.hourScroll.destroy();
            this.minuteScroll.destroy();
            this.meridiemScroll.destroy();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _state = this.state,
                is_hour_selected = _state.is_hour_selected,
                is_minute_selected = _state.is_minute_selected,
                is_meridiem_selected = _state.is_meridiem_selected;

            if (is_hour_selected && is_minute_selected && is_meridiem_selected) {
                this.resetValues();
                this.props.toggle();
            }

            var _state2 = this.state,
                hour = _state2.hour,
                minute = _state2.minute,
                meridiem = _state2.meridiem;

            if (hour && minute && meridiem && (hour !== prevState.hour || minute !== prevState.minute || meridiem !== prevState.meridiem)) {
                // Call on change only once when all of the values are selected and one of the value is changed
                this.props.onChange(hour + ':' + minute + ' ' + meridiem);
            }

            if (!prevProps.className && this.props.className === 'active') {
                this.resetValues();
            }
            if (prevState.last_updated_type !== this.state.last_updated_type && this.state.last_updated_type) {
                this.scrollToSelected(this.state.last_updated_type, 200);
                this.setState({ last_updated_type: null });
            }
        }
    }, {
        key: 'initIScroll',
        value: function initIScroll() {
            var iScrollOptions = {
                mouseWheel: true,
                useTransition: true
            };
            this.hourScroll = new _iscroll2.default('.time-picker-hours', iScrollOptions);
            this.minuteScroll = new _iscroll2.default('.time-picker-minutes', iScrollOptions);
            this.meridiemScroll = new _iscroll2.default('.time-picker-meridiem', iScrollOptions);
        }
    }, {
        key: 'scrollToSelected',
        value: function scrollToSelected(type, duration) {
            var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -30;

            // move to selected item
            var wrapper = {
                hour: this.hourScroll,
                minute: this.minuteScroll,
                meridiem: this.meridiemScroll
            };
            if (wrapper[type].scroller.querySelector('.selected')) {
                wrapper[type].scrollToElement('.selected', duration, null, offset, _iscroll2.default.utils.ease.elastic);
            } else {
                wrapper[type].scrollToElement('.list-item', duration, null, null);
            }
        }
    }, {
        key: 'resetValues',
        value: function resetValues() {
            this.setState({
                is_hour_selected: false,
                is_minute_selected: false,
                is_meridiem_selected: false
            });
            this.hourScroll.refresh();
            this.minuteScroll.refresh();
            this.meridiemScroll.refresh();
            this.scrollToSelected('hour', 0, 0);
            this.scrollToSelected('minute', 0, 0);
            this.scrollToSelected('meridiem', 0, 0);
        }
    }, {
        key: 'selectOption',
        value: function selectOption(type, value) {
            this.setState({
                last_updated_type: type
            });
            if (type === 'hour') {
                this.setState({
                    hour: value,
                    is_hour_selected: true
                });
            } else if (type === 'minute') {
                this.setState({
                    minute: value,
                    is_minute_selected: true
                });
            } else {
                this.setState({
                    meridiem: value,
                    is_meridiem_selected: true
                });
            }
        }
    }, {
        key: 'saveRef',
        value: function saveRef(type, node) {
            var _this2 = this;

            if (!node) return;
            var save = {
                hour: function hour(n) {
                    return _this2.hourSelect = n;
                },
                minute: function minute(n) {
                    return _this2.minuteSelect = n;
                },
                meridiem: function meridiem(n) {
                    return _this2.meridiemSelect = n;
                }
            };

            save[type](node);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                preClass = _props.preClass,
                value = _props.value,
                toggle = _props.toggle;

            return _react2.default.createElement(
                'div',
                { className: preClass + '-dropdown ' + this.props.className },
                _react2.default.createElement(
                    'div',
                    {
                        className: preClass + '-panel',
                        onClick: toggle
                    },
                    _react2.default.createElement(
                        'span',
                        { className: value ? '' : 'placeholder' },
                        value || (0, _localize.localize)('Select time')
                    ),
                    _react2.default.createElement('span', {
                        className: preClass + '-clear',
                        onClick: this.clear
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: preClass + '-selector' },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.saveHourRef,
                            className: preClass + '-hours'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-container' },
                            this.hours.map(function (h, key) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'list-item' + (_this3.state.hour === h ? ' selected' : ''),
                                        key: key,
                                        onClick: _this3.selectHour.bind(null, h)
                                    },
                                    h
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.saveMinuteRef,
                            className: preClass + '-minutes'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-container' },
                            this.minutes.map(function (mm, key) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'list-item' + (_this3.state.minute === mm ? ' selected' : ''),
                                        key: key,
                                        onClick: _this3.selectMinute.bind(null, mm)
                                    },
                                    mm
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.saveMeridiemRef,
                            className: preClass + '-meridiem'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-container' },
                            this.meridiem.map(function (a, key) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'list-item' + (_this3.state.meridiem === a ? ' selected' : ''),
                                        key: key,
                                        onClick: _this3.selectMeridiem.bind(null, a)
                                    },
                                    a
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return TimePickerDropdown;
}(_react.PureComponent);

var TimePicker = function (_PureComponent2) {
    _inherits(TimePicker, _PureComponent2);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this4 = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this4.toggleDropDown = function () {
            _this4.setState({ is_open: !_this4.state.is_open });
        };

        _this4.handleChange = function (arg) {
            // To handle nativepicker;
            var value = (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' ? _this4.convertTo12h(arg.target.value) : arg;

            if (value !== _this4.props.value) {
                _this4.props.onChange({ target: { name: _this4.props.name, value: value } });
            }
        };

        _this4.saveRef = function (node) {
            if (!node) return;
            if (node.nodeName === 'INPUT') {
                _this4.target_element = node;
                return;
            }
            _this4.wrapper_ref = node;
        };

        _this4.handleClickOutside = function (event) {
            if (_this4.wrapper_ref && !_this4.wrapper_ref.contains(event.target)) {
                if (_this4.state.is_open) {
                    _this4.setState({ is_open: false });
                }
            }
        };

        _this4.convertTo24h = function (value) {
            if (!value) return '';

            var _value$split = value.split(':'),
                _value$split2 = _slicedToArray(_value$split, 2),
                hour = _value$split2[0],
                other = _value$split2[1];

            var _other$split = other.split(' '),
                _other$split2 = _slicedToArray(_other$split, 2),
                minute = _other$split2[0],
                meridiem = _other$split2[1];

            if (meridiem.toLowerCase() === 'pm') {
                return (hour % 12 ? +hour + 12 : '12') + ':' + minute;
            }
            return (hour % 12 ? hour : '00') + ':' + minute;
        };

        _this4.convertTo12h = function (value) {
            if (!value) return '';

            var _value$split3 = value.split(':'),
                _value$split4 = _slicedToArray(_value$split3, 2),
                hour = _value$split4[0],
                minute = _value$split4[1];

            var meridiem = +hour >= 12 ? 'pm' : 'am';
            if (meridiem === 'pm' && hour > 12) {
                return ('0' + (+hour - 12)).slice(-2) + ':' + minute + ' ' + meridiem;
            }

            return (+hour === 0 ? 12 : hour) + ':' + minute + ' ' + meridiem;
        };

        _this4.state = {
            is_open: false,
            value: ''
        };
        return _this4;
    }

    _createClass(TimePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'render',
        value: function render() {
            var prefix_class = 'time-picker';
            var _props2 = this.props,
                is_nativepicker = _props2.is_nativepicker,
                value = _props2.value,
                name = _props2.name,
                placeholder = _props2.placeholder;

            var formatted_value = this.convertTo24h(value);
            return _react2.default.createElement(
                'div',
                {
                    ref: this.saveRef,
                    className: '' + prefix_class + (this.props.padding ? ' padding' : '') + (this.state.is_open ? ' active' : '')
                },
                is_nativepicker ? _react2.default.createElement('input', {
                    type: 'time',
                    id: prefix_class + '-input',
                    value: formatted_value,
                    onChange: this.handleChange,
                    name: name
                }) : _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement('input', {
                        ref: this.saveRef,
                        type: 'text',
                        readOnly: true,
                        id: prefix_class + '-input',
                        className: prefix_class + '-input ' + (this.state.is_open ? 'active' : ''),
                        value: value,
                        onClick: this.toggleDropDown,
                        name: name,
                        placeholder: placeholder
                    }),
                    _react2.default.createElement(TimePickerDropdown, {
                        className: this.state.is_open ? 'active' : '',
                        toggle: this.toggleDropDown,
                        onChange: this.handleChange,
                        preClass: prefix_class,
                        value: value
                    })
                )
            );
        }
    }]);

    return TimePicker;
}(_react.PureComponent);

TimePicker.propTypes = {
    is_nativepicker: _propTypes2.default.bool,
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    padding: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    value: _propTypes2.default.string
};

TimePickerDropdown.propTypes = {
    className: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    preClass: _propTypes2.default.string,
    toggle: _propTypes2.default.func,
    value: _propTypes2.default.string,
    value_split: _propTypes2.default.bool
};

exports.default = TimePicker;

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disposeActions = exports.initActions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// add files containing actions here.


var _mobx = __webpack_require__(68);

var _utility = __webpack_require__(1);

var _contract_type = __webpack_require__(386);

var ContractType = _interopRequireWildcard(_contract_type);

var _currency = __webpack_require__(387);

var Currency = _interopRequireWildcard(_currency);

var _duration = __webpack_require__(388);

var Duration = _interopRequireWildcard(_duration);

var _start_date = __webpack_require__(390);

var StartDate = _interopRequireWildcard(_start_date);

var _symbol = __webpack_require__(391);

var _Symbol = _interopRequireWildcard(_symbol);

var _test = __webpack_require__(214);

var Test = _interopRequireWildcard(_test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var reaction_disposers = [];

var defaultExports = _extends({}, ContractType, Currency, Duration, _Symbol, StartDate, Test);

var initActions = exports.initActions = function initActions(store) {
    Object.keys(defaultExports).forEach(function (methodName) {
        var method = defaultExports[methodName];

        if (/.*async$/i.test(methodName)) {
            defaultExports[methodName] = (0, _mobx.flow)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
                var snapshot, new_state;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                snapshot = (0, _utility.cloneObject)(store);
                                _context.next = 3;
                                return (0, _mobx.flow)(method)(snapshot, payload);

                            case 3:
                                new_state = _context.sent;

                                Object.keys(new_state).forEach(function (key) {
                                    store[key] = new_state[key];
                                });

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        } else {
            defaultExports[methodName] = (0, _mobx.action)(methodName, function (payload) {
                var snapshot = (0, _utility.cloneObject)(store);
                var new_state = method(snapshot, payload);
                Object.keys(new_state).forEach(function (key) {
                    store[key] = new_state[key];
                });
            });
        }
    });

    var reaction_map = {
        symbol: defaultExports.onChangeSymbolAsync,
        contract_types_list: defaultExports.onChangeContractTypeList,
        contract_type: defaultExports.onChangeContractType,
        amount: defaultExports.onChangeAmount,
        expiry_type: defaultExports.onChangeExpiry,
        expiry_date: defaultExports.onChangeExpiry,
        expiry_time: defaultExports.onChangeExpiry,
        duration_unit: defaultExports.onChangeExpiry,
        start_date: defaultExports.onChangeStartDate
    };

    Object.keys(reaction_map).forEach(function (reaction_key) {
        var disposer = (0, _mobx.reaction)(function () {
            return store[reaction_key];
        }, reaction_map[reaction_key]);
        reaction_disposers.push(disposer);
    });
};

var disposeActions = exports.disposeActions = function disposeActions() {
    reaction_disposers.forEach(function (disposer) {
        disposer();
    });
};

exports.default = defaultExports;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTime = exports.onChangeAmount = exports.getTicks = exports.getCountryAsync = undefined;

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _dao = __webpack_require__(91);

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCountryAsync = /*#__PURE__*/exports.getCountryAsync = regeneratorRuntime.mark(function getCountryAsync() {
    var r;
    return regeneratorRuntime.wrap(function getCountryAsync$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _dao2.default.getWebsiteStatus();

                case 2:
                    r = _context.sent;
                    return _context.abrupt('return', {
                        message: 'Your country is: ' + r.website_status.clients_country
                    });

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, getCountryAsync, this);
});

/* This action does not modify state directlly.
 * The payload will be the callback that get's called for each tick
 */
var cb = void 0;
var ticksCallback = function ticksCallback(response) {
    var data = response.error ? response.error.message : new Date(response.tick.epoch * 1000).toUTCString() + ': ' + response.tick.quote;
    cb(data);
};

var getTicks = exports.getTicks = function getTicks(_ref, callback) {
    var symbol = _ref.symbol;

    cb = callback;
    _dao2.default.subscribeTicks(symbol, ticksCallback, true);
    return {};
};

var onChangeAmount = exports.onChangeAmount = function onChangeAmount(_ref2) {
    var amount = _ref2.amount;

    var barrier_2 = amount * 2;
    // console.log('Amount: ', amount, 'Low Barrier: ', barrier_2);
    return {
        barrier_2: barrier_2
    };
};

var initTime = exports.initTime = function initTime() {
    return {
        server_time: window.time || _moment2.default.utc()
    };
};

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _url = __webpack_require__(9);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullscreenDialog = function (_React$PureComponent) {
    _inherits(FullscreenDialog, _React$PureComponent);

    function FullscreenDialog() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FullscreenDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FullscreenDialog.__proto__ || Object.getPrototypeOf(FullscreenDialog)).call.apply(_ref, [this].concat(args))), _this), _this.scrollToElIfNeeded = function (parent, el) {
            var viewport_offset = el.getBoundingClientRect();
            var hidden = viewport_offset.top + el.clientHeight + 20 > window.innerHeight;
            if (hidden) {
                var new_el_top = (window.innerHeight - el.clientHeight) / 2;
                parent.scrollTop += viewport_offset.top - new_el_top;
            }
        }, _this.handleClick = function (e) {
            if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
                var scrollToTarget = _this.scrollToElIfNeeded.bind(null, e.currentTarget, e.target);
                window.addEventListener('resize', scrollToTarget, false);

                // remove listener, resize is not fired on iOS safari
                window.setTimeout(function () {
                    window.removeEventListener('resize', scrollToTarget, false);
                }, 2000);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FullscreenDialog, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.visible) {
                document.body.classList.add('no-scroll');
                document.getElementById('binary_app').classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
                document.getElementById('binary_app').classList.remove('no-scroll');
            }
        }

        // sometimes input is covered by virtual keyboard on mobile chrome, uc browser

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                visible = _props.visible,
                children = _props.children;


            return _react2.default.createElement(
                'div',
                {
                    className: 'fullscreen-dialog ' + (visible ? 'fullscreen-dialog--open' : ''),
                    onClick: this.handleClick.bind(this)
                },
                _react2.default.createElement(
                    'div',
                    { className: 'fullscreen-dialog__header' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'fullscreen-dialog__title' },
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'icons btn-close fullscreen-dialog__close-btn',
                            onClick: this.props.onClose
                        },
                        _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/common/close.svg'), alt: 'Close' })
                    )
                ),
                _react2.default.createElement('div', { className: 'fullscreen-dialog__header-shadow-cover' }),
                _react2.default.createElement('div', { className: 'fullscreen-dialog__header-shadow' }),
                _react2.default.createElement(
                    'div',
                    { className: 'fullscreen-dialog__content' },
                    children
                )
            );
        }
    }]);

    return FullscreenDialog;
}(_react2.default.PureComponent);

FullscreenDialog.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    onClose: _propTypes2.default.func,
    title: _propTypes2.default.string,
    visible: _propTypes2.default.bool
};

exports.default = FullscreenDialog;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(7);
var isCryptocurrency = __webpack_require__(52).isCryptocurrency;
var SocketCache = __webpack_require__(45);
var LocalStore = __webpack_require__(5).LocalStore;
var State = __webpack_require__(5).State;
var getPropertyValue = __webpack_require__(1).getPropertyValue;
var isEmptyObject = __webpack_require__(1).isEmptyObject;

var ClientBase = function () {
    var storage_key = 'client.accounts';
    var client_object = {};
    var current_loginid = void 0;

    var init = function init() {
        current_loginid = LocalStore.get('active_loginid');
        client_object = getAllAccountsObject();
    };

    var isLoggedIn = function isLoggedIn() {
        return !isEmptyObject(getAllAccountsObject()) && get('loginid') && get('token');
    };

    var isValidLoginid = function isValidLoginid() {
        if (!isLoggedIn()) return true;
        var valid_login_ids = new RegExp('^(MX|MF|VRTC|MLT|CR|FOG)[0-9]+$', 'i');
        return getAllLoginids().every(function (loginid) {
            return valid_login_ids.test(loginid);
        });
    };

    /**
     * Stores the client information in local variable and localStorage
     *
     * @param {String} key                 The property name to set
     * @param {String|Number|Object} value The regarding value
     * @param {String|null} loginid        The account to set the value for
     */
    var set = function set(key, value) {
        var loginid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : current_loginid;

        if (key === 'loginid' && value !== current_loginid) {
            LocalStore.set('active_loginid', value);
            current_loginid = value;
        } else {
            if (!(loginid in client_object)) {
                client_object[loginid] = {};
            }
            client_object[loginid][key] = value;
            LocalStore.setObject(storage_key, client_object);
        }
    };

    /**
     * Returns the client information
     *
     * @param {String|null} key     The property name to return the value from, if missing returns the account object
     * @param {String|null} loginid The account to return the value from
     */
    var get = function get(key) {
        var loginid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : current_loginid;

        var value = void 0;
        if (key === 'loginid') {
            value = loginid || LocalStore.get('active_loginid');
        } else {
            var current_client = client_object[loginid] || getAllAccountsObject()[loginid] || client_object;

            value = key ? current_client[key] : current_client;
        }
        if (!Array.isArray(value) && (+value === 1 || +value === 0 || value === 'true' || value === 'false')) {
            value = JSON.parse(value || false);
        }
        return value;
    };

    var getAllAccountsObject = function getAllAccountsObject() {
        return LocalStore.getObject(storage_key);
    };

    var getAllLoginids = function getAllLoginids() {
        return Object.keys(getAllAccountsObject());
    };

    var getAccountType = function getAccountType() {
        var loginid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : current_loginid;

        var account_type = void 0;
        if (/^VR/.test(loginid)) account_type = 'virtual';else if (/^MF/.test(loginid)) account_type = 'financial';else if (/^MLT/.test(loginid)) account_type = 'gaming';
        return account_type;
    };

    var isAccountOfType = function isAccountOfType(type) {
        var loginid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : current_loginid;
        var only_enabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var this_type = getAccountType(loginid);
        return (type === 'virtual' && this_type === 'virtual' || type === 'real' && this_type !== 'virtual' || type === this_type) && (only_enabled ? !get('is_disabled', loginid) : true);
    };

    var getAccountOfType = function getAccountOfType(type, only_enabled) {
        var id = getAllLoginids().find(function (loginid) {
            return isAccountOfType(type, loginid, only_enabled);
        });
        return id ? Object.assign({ loginid: id }, get(null, id)) : {};
    };

    var hasAccountType = function hasAccountType(type, only_enabled) {
        return !isEmptyObject(getAccountOfType(type, only_enabled));
    };

    // only considers currency of real money accounts
    // @param {String} type = crypto|fiat
    var hasCurrencyType = function hasCurrencyType(type) {
        var loginids = getAllLoginids();
        if (type === 'crypto') {
            // find if has crypto currency account
            return loginids.find(function (loginid) {
                return !get('is_virtual', loginid) && isCryptocurrency(get('currency', loginid));
            });
        }
        // else find if have fiat currency account
        return loginids.find(function (loginid) {
            return !get('is_virtual', loginid) && !isCryptocurrency(get('currency', loginid));
        });
    };

    var types_map = {
        virtual: 'Virtual',
        gaming: 'Gaming',
        financial: 'Investment'
    };

    var getAccountTitle = function getAccountTitle(loginid) {
        return types_map[getAccountType(loginid)] || 'Real';
    };

    var responseAuthorize = function responseAuthorize(response) {
        var authorize = response.authorize;
        set('email', authorize.email);
        set('currency', authorize.currency);
        set('is_virtual', +authorize.is_virtual);
        set('session_start', parseInt(moment().valueOf() / 1000));
        set('landing_company_shortcode', authorize.landing_company_name);
        updateAccountList(authorize.account_list);
    };

    var updateAccountList = function updateAccountList(account_list) {
        account_list.forEach(function (account) {
            set('excluded_until', account.excluded_until || '', account.loginid);
            Object.keys(account).forEach(function (param) {
                var param_to_set = param === 'country' ? 'residence' : param;
                var value_to_set = typeof account[param] === 'undefined' ? '' : account[param];
                if (param_to_set !== 'loginid') {
                    set(param_to_set, value_to_set, account.loginid);
                }
            });
        });
    };

    var shouldAcceptTnc = function shouldAcceptTnc() {
        if (get('is_virtual')) return false;
        var website_tnc_version = State.getResponse('website_status.terms_conditions_version');
        var client_tnc_status = State.getResponse('get_settings.client_tnc_status');
        return typeof client_tnc_status !== 'undefined' && client_tnc_status !== website_tnc_version;
    };

    var clearAllAccounts = function clearAllAccounts() {
        current_loginid = undefined;
        client_object = {};
        LocalStore.setObject(storage_key, client_object);
    };

    var setNewAccount = function setNewAccount(options) {
        if (!options.email || !options.loginid || !options.token) {
            return false;
        }

        SocketCache.clear();
        localStorage.setItem('GTM_new_account', '1');

        set('token', options.token, options.loginid);
        set('email', options.email, options.loginid);
        set('is_virtual', +options.is_virtual, options.loginid);
        set('loginid', options.loginid);

        return true;
    };

    var currentLandingCompany = function currentLandingCompany() {
        var landing_company_response = State.getResponse('landing_company') || {};
        var this_shortcode = get('landing_company_shortcode');
        var landing_company_prop = Object.keys(landing_company_response).find(function (key) {
            return this_shortcode === landing_company_response[key].shortcode;
        });
        return landing_company_response[landing_company_prop] || {};
    };

    var shouldCompleteTax = function shouldCompleteTax() {
        return isAccountOfType('financial') && !/crs_tin_information/.test((State.getResponse('get_account_status') || {}).status);
    };

    var getMT5AccountType = function getMT5AccountType(group) {
        return group ? group.replace('\\', '_').replace(/_(\d+|master)/, '') : '';
    }; // remove manager id or master distinction from group

    var getBasicUpgradeInfo = function getBasicUpgradeInfo() {
        var upgradeable_landing_companies = State.getResponse('authorize.upgradeable_landing_companies');

        var can_open_multi = false;
        var type = void 0,
            can_upgrade_to = void 0;

        if ((upgradeable_landing_companies || []).length) {
            var current_landing_company = get('landing_company_shortcode');

            can_open_multi = upgradeable_landing_companies.indexOf(current_landing_company) !== -1;

            // only show upgrade message to landing companies other than current
            var canUpgrade = function canUpgrade() {
                for (var _len = arguments.length, landing_companies = Array(_len), _key = 0; _key < _len; _key++) {
                    landing_companies[_key] = arguments[_key];
                }

                return landing_companies.find(function (landing_company) {
                    return landing_company !== current_landing_company && upgradeable_landing_companies.indexOf(landing_company) !== -1;
                });
            };

            can_upgrade_to = canUpgrade('costarica', 'iom', 'malta', 'maltainvest', 'japan');
            if (can_upgrade_to) {
                type = can_upgrade_to === 'maltainvest' ? 'financial' : 'real';
            }
        }

        return {
            type: type,
            can_upgrade: !!can_upgrade_to,
            can_upgrade_to: can_upgrade_to,
            can_open_multi: can_open_multi
        };
    };

    var getLandingCompanyValue = function getLandingCompanyValue(loginid, landing_company, key) {
        var landing_company_object = void 0;
        if (loginid.financial || isAccountOfType('financial', loginid)) {
            landing_company_object = getPropertyValue(landing_company, 'financial_company');
        } else if (loginid.real || isAccountOfType('real', loginid)) {
            landing_company_object = getPropertyValue(landing_company, 'gaming_company');

            // handle accounts that don't have gaming company
            if (!landing_company_object) {
                landing_company_object = getPropertyValue(landing_company, 'financial_company');
            }
        } else {
            var financial_company = (getPropertyValue(landing_company, 'financial_company') || {})[key] || [];
            var gaming_company = (getPropertyValue(landing_company, 'gaming_company') || {})[key] || [];
            landing_company_object = financial_company.concat(gaming_company);
            return landing_company_object;
        }
        return (landing_company_object || {})[key];
    };

    // API_V3: send a list of accounts the client can transfer to
    var canTransferFunds = function canTransferFunds(account) {
        if (account) {
            // this specific account can be used to transfer funds to
            return canTransferFundsTo(account.loginid);
        }
        // at least one account can be used to transfer funds to
        return Object.keys(client_object).some(function (loginid) {
            return canTransferFundsTo(loginid);
        });
    };

    var canTransferFundsTo = function canTransferFundsTo(to_loginid) {
        if (to_loginid === current_loginid || get('is_virtual', to_loginid) || get('is_virtual') || get('is_disabled', to_loginid)) {
            return false;
        }
        var from_currency = get('currency');
        var to_currency = get('currency', to_loginid);
        if (!from_currency || !to_currency) {
            return false;
        }
        // only transfer to other accounts that have the same currency as current account if one is maltainvest and one is malta
        if (from_currency === to_currency) {
            // these landing companies are allowed to transfer funds to each other if they have the same currency
            var same_cur_allowed = {
                maltainvest: 'malta',
                malta: 'maltainvest'
            };
            var from_landing_company = get('landing_company_shortcode');
            var to_landing_company = get('landing_company_shortcode', to_loginid);
            // if same_cur_allowed[from_landing_company] is undefined and to_landing_company is also undefined, it will return true
            // so we should compare '' === undefined instead
            return (same_cur_allowed[from_landing_company] || '') === to_landing_company;
        }
        // or for other clients if current account is cryptocurrency it should only transfer to fiat currencies and vice versa
        var is_from_crypto = isCryptocurrency(from_currency);
        var is_to_crypto = isCryptocurrency(to_currency);
        return is_from_crypto ? !is_to_crypto : is_to_crypto;
    };

    var hasCostaricaAccount = function hasCostaricaAccount() {
        return !!getAllLoginids().find(function (loginid) {
            return (/^CR/.test(loginid)
            );
        });
    };

    return {
        init: init,
        isLoggedIn: isLoggedIn,
        isValidLoginid: isValidLoginid,
        set: set,
        get: get,
        getAllLoginids: getAllLoginids,
        getAccountType: getAccountType,
        isAccountOfType: isAccountOfType,
        getAccountOfType: getAccountOfType,
        hasAccountType: hasAccountType,
        hasCurrencyType: hasCurrencyType,
        getAccountTitle: getAccountTitle,
        responseAuthorize: responseAuthorize,
        shouldAcceptTnc: shouldAcceptTnc,
        clearAllAccounts: clearAllAccounts,
        setNewAccount: setNewAccount,
        currentLandingCompany: currentLandingCompany,
        shouldCompleteTax: shouldCompleteTax,
        getMT5AccountType: getMT5AccountType,
        getBasicUpgradeInfo: getBasicUpgradeInfo,
        getLandingCompanyValue: getLandingCompanyValue,
        canTransferFunds: canTransferFunds,
        hasCostaricaAccount: hasCostaricaAccount
    };
}();

module.exports = ClientBase;

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mobx = __webpack_require__(68);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(135);

var _reactRouterDom = __webpack_require__(265);

var _network_monitor = __webpack_require__(370);

var _network_monitor2 = _interopRequireDefault(_network_monitor);

var _client_store = __webpack_require__(404);

var _client_store2 = _interopRequireDefault(_client_store);

var _connect = __webpack_require__(33);

var _trade_store = __webpack_require__(405);

var _trade_store2 = _interopRequireDefault(_trade_store);

var _ui_store = __webpack_require__(406);

var _ui_store2 = _interopRequireDefault(_ui_store);

var _footer = __webpack_require__(381);

var _footer2 = _interopRequireDefault(_footer);

var _header = __webpack_require__(382);

var _header2 = _interopRequireDefault(_header);

var _actions = __webpack_require__(213);

var _routes = __webpack_require__(117);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mobx.configure)({ enforceActions: true });

var stores = {
    client: new _client_store2.default(),
    trade: new _trade_store2.default(),
    ui: new _ui_store2.default()
};

var initApp = function initApp() {
    _client_base2.default.init();
    _network_monitor2.default.init(stores.client);

    (0, _actions.initActions)(stores.trade);
    stores.trade.init();

    var app = document.getElementById('binary_app');
    if (app) {
        (0, _reactDom.render)(_react2.default.createElement(BinaryApp, null), app);
    }
};

// TODO
// const onUnload = () => {
//     stores.trade.dispose();
//     disposeActions();
// };

var BinaryApp = function BinaryApp() {
    return _react2.default.createElement(
        _reactRouterDom.HashRouter,
        null,
        _react2.default.createElement(
            _connect.MobxProvider,
            { store: stores },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'trading_header' },
                    _react2.default.createElement(_header2.default, {
                        items: [{ icon: 'trade', text: (0, _localize.localize)('Trade'), link_to: '/' }, { icon: 'portfolio', text: (0, _localize.localize)('Portfolio') }, { icon: 'statement', text: (0, _localize.localize)('Statement'), link_to: 'statement' }, { icon: 'cashier', text: (0, _localize.localize)('Cashier') }]
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'app_contents' },
                    _react2.default.createElement(_routes.BinaryRoutes, null)
                ),
                _react2.default.createElement(
                    'footer',
                    { id: 'trading_footer' },
                    _react2.default.createElement(_footer2.default, {
                        items: [{ icon: 'ic-statement', text: (0, _localize.localize)('Statement'), link_to: 'statement' }, { icon: 'ic-chat-bubble', text: (0, _localize.localize)('Notification') }, { icon: 'ic-lock-open', text: (0, _localize.localize)('Lock') }]
                    })
                )
            )
        )
    );
};

exports.default = initApp;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createElement = __webpack_require__(1).createElement;

// show hedging value if trading purpose is set to hedging else hide it
var detectHedging = function detectHedging($purpose, $hedging) {
    $purpose.change(function () {
        $hedging.setVisibility($purpose.val() === 'Hedging');
    });
};

var jqueryuiTabsToDropdown = function jqueryuiTabsToDropdown($container) {
    var $ddl = $('<select/>');
    $container.find('li a').each(function () {
        $ddl.append($('<option/>', { text: $(this).text(), value: $(this).attr('href') }));
    });
    $ddl.change(function () {
        $container.find('li a[href="' + $(this).val() + '"]').click();
    });
    return $ddl;
};

var makeOption = function makeOption(options) {
    // setting null value helps with detecting required error
    // on 'Please select' options
    // that have no value of their own
    var option_el = createElement('option', { text: options.text, value: options.value || '' });

    if (options.is_disabled && options.is_disabled.toLowerCase() === 'disabled') {
        option_el.setAttribute('disabled', 'disabled');
    }
    if (options.class) {
        option_el.className = options.class;
    }
    if (options.is_selected) {
        option_el.setAttribute('selected', 'selected');
    }
    return option_el;
};

/*
 * function to check if element is visible or not
 *
 * alternative to jquery $('#id').is(':visible')
 */
var isVisible = function isVisible(elem) {
    return !(!elem || elem.offsetWidth === 0 && elem.offsetHeight === 0);
};

/*
 * function to check if browser supports the type date/time
 * send a wrong val in case browser 'pretends' to support
 */
var checkInput = function checkInput(type, wrong_val) {
    var input = createElement('input', { type: type, value: wrong_val });
    return input.value !== wrong_val;
};

/*
 * function to check if new date is selected using native picker
 * if yes, update the data-value. if no, return false.
 */
var dateValueChanged = function dateValueChanged(element, type) {
    var value = void 0;
    if (element.selectedOptions) {
        value = element.selectedOptions[0].getAttribute('data-value');
    } else {
        value = element.value;
    }
    if (element.getAttribute('data-value') === value) {
        return false;
    }
    if (element.getAttribute('type') === type) {
        element.setAttribute('data-value', value);
    }
    return true;
};

var selectorExists = function selectorExists(element) {
    return typeof element !== 'undefined' && element !== null;
};

var getSetElementValue = function getSetElementValue(element, text, type) {
    // eslint-disable-line consistent-return
    if (selectorExists(element)) {
        if (typeof text === 'undefined') return element[type];
        // else
        element[type] = text;
    }
};

/*
 * @param  {String}  id_selector   the selector for the element
 * @param  {Element} parent        optional selector to use for parent, defaults to document
 * @return {Element}               return element if it exists, if it doesn't return a dummy element
 */
var getElementById = function getElementById(id_selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return parent.getElementById(id_selector) || createElement('div');
};

/*
 * @param  {String}  class_name    the selector class for the element
 * @param  {Element} parent        optional selector to use for parent, defaults to document
 * @return {Element}               return element if it is visible
 */
var getVisibleElement = function getVisibleElement(class_name) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return Array.from(parent.getElementsByClassName(class_name)).find(function (el) {
        return isVisible(el);
    });
};

module.exports = {
    detectHedging: detectHedging,
    jqueryuiTabsToDropdown: jqueryuiTabsToDropdown,
    makeOption: makeOption,
    isVisible: isVisible,
    checkInput: checkInput,
    dateValueChanged: dateValueChanged,
    selectorExists: selectorExists,
    getElementById: getElementById,
    getVisibleElement: getVisibleElement,
    elementTextContent: function elementTextContent(element, text) {
        return getSetElementValue(element, text, 'textContent');
    },
    elementInnerHtml: function elementInnerHtml(element, text) {
        return getSetElementValue(element, text, 'innerHTML');
    }
};

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = exports.MobxProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = __webpack_require__(68);

var _mobxReact = __webpack_require__(639);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPECIAL_REACT_KEYS = { children: true, key: true, ref: true };

var MobxProvider = exports.MobxProvider = function (_Provider) {
    _inherits(MobxProvider, _Provider);

    function MobxProvider() {
        _classCallCheck(this, MobxProvider);

        return _possibleConstructorReturn(this, (MobxProvider.__proto__ || Object.getPrototypeOf(MobxProvider)).apply(this, arguments));
    }

    _createClass(MobxProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var stores = {};

            // inherit stores
            var baseStores = this.context.mobxStores;
            if (baseStores) {
                for (var key in baseStores) {
                    // eslint-disable-line
                    stores[key] = baseStores[key];
                }
            }

            // add own stores
            for (var _key in this.props.store) {
                // eslint-disable-line
                if (!SPECIAL_REACT_KEYS[_key]) {
                    stores[_key] = this.props.store[_key];
                }
            }

            return {
                mobxStores: stores
            };
        }
    }]);

    return MobxProvider;
}(_mobxReact.Provider);

var isFunction = function isFunction(fn) {
    return typeof fn === 'function';
};
var isShallowEqual = function isShallowEqual(a, b) {
    return Object.keys(a).every(function (key) {
        return isFunction(a[key]) && isFunction(b[key]) || a[key] === b[key];
    });
};

var unboxProps = function unboxProps(props) {
    var unboxedProps = {};
    Object.keys(props).forEach(function (key) {
        var value = props[key];
        var result = void 0;

        if ((0, _mobx.isObservableArray)(value)) {
            result = value.peek();
        } else if ((0, _mobx.isObservableMap)(value)) {
            result = value.toJS();
        } else if ((0, _mobx.isBoxedObservable)(value)) {
            result = value.get();
        } else if ((0, _mobx.isObservable)(value)) {
            result = (0, _mobx.toJS)(value);
        } else {
            result = value;
        }

        unboxedProps[key] = result;
    });

    return unboxedProps;
};

var connect = exports.connect = function connect(mapStoresToProps) {
    return function (WrappedComponent) {
        var UnboxedComponent = function (_Component) {
            _inherits(UnboxedComponent, _Component);

            function UnboxedComponent() {
                _classCallCheck(this, UnboxedComponent);

                return _possibleConstructorReturn(this, (UnboxedComponent.__proto__ || Object.getPrototypeOf(UnboxedComponent)).apply(this, arguments));
            }

            _createClass(UnboxedComponent, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(WrappedComponent, this.props);
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    return !isShallowEqual(nextProps, this.props);
                }
            }]);

            return UnboxedComponent;
        }(_react.Component);

        // wrap the mapping function usually passed to mobx-react's inject method
        // so that it additionally unboxes any observables


        var unboxedMapStoresToProps = function unboxedMapStoresToProps(stores, props, context) {
            var injectedProps = mapStoresToProps(stores, props, context);
            Object.assign(injectedProps, props);
            return unboxProps(injectedProps);
        };

        // apply the mobx store injection with our wrapped function
        var InjectedComponent = (0, _mobxReact.inject)(unboxedMapStoresToProps)(UnboxedComponent);

        // make some nice names that will show up in the React Devtools
        var wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || WrappedComponent.constructor && WrappedComponent.constructor.name || 'Unknown';
        InjectedComponent.displayName = 'inject-' + wrappedDisplayName;
        UnboxedComponent.displayName = 'unbox-' + wrappedDisplayName;

        return InjectedComponent;
    };
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const Cookies = require('js-cookie');

/*
 * Configuration values needed in js codes
 *
 * NOTE:
 * Please use the following command to avoid accidentally committing personal changes
 * git update-index --assume-unchanged src/javascript/config.js
 *
 */

var getAppId = function getAppId() {
    var app_id = null;
    var user_app_id = ''; // you can insert Application ID of your registered application here
    var config_app_id = window.localStorage.getItem('config.app_id');
    if (config_app_id) {
        app_id = config_app_id;
    } else if (/staging\.binary\.com/i.test(window.location.hostname)) {
        window.localStorage.removeItem('config.default_app_id');
        app_id = 1098;
    } else if (user_app_id.length) {
        window.localStorage.setItem('config.default_app_id', user_app_id); // it's being used in endpoint chrome extension - please do not remove
        app_id = user_app_id;
    } else if (/localhost/i.test(window.location.hostname)) {
        app_id = 1159;
    } else {
        window.localStorage.removeItem('config.default_app_id');
        app_id = 1;
    }
    return app_id;
};

var getSocketURL = function getSocketURL() {
    var server_url = window.localStorage.getItem('config.server_url');
    if (!server_url) {
        // const to_green_percent = { real: 100, virtual: 0, logged_out: 0 }; // default percentage
        // const category_map     = ['real', 'virtual', 'logged_out'];
        // const percent_values   = Cookies.get('connection_setup'); // set by GTM
        //
        // // override defaults by cookie values
        // if (percent_values && percent_values.indexOf(',') > 0) {
        //     const cookie_percents = percent_values.split(',');
        //     category_map.map((cat, idx) => {
        //         if (cookie_percents[idx] && !isNaN(cookie_percents[idx])) {
        //             to_green_percent[cat] = +cookie_percents[idx].trim();
        //         }
        //     });
        // }

        // let server = 'blue';
        // if (/www\.binary\.com/i.test(window.location.hostname)) {
        //     const loginid = window.localStorage.getItem('active_loginid');
        //     let client_type = category_map[2];
        //     if (loginid) {
        //         client_type = /^VRT/.test(loginid) ? category_map[1] : category_map[0];
        //     }
        //
        //     const random_percent = Math.random() * 100;
        //     if (random_percent < to_green_percent[client_type]) {
        //         server = 'green';
        //     }
        // }

        // TODO: in order to use connection_setup config, uncomment the above section and remove next lines

        var is_production = /www\.binary\.com/i.test(window.location.hostname);
        var loginid = window.localStorage.getItem('active_loginid');
        var is_real = loginid && !/^VRT/.test(loginid);
        var server = is_production && is_real ? 'green' : 'blue';

        server_url = server + '.binaryws.com';
    }
    return 'wss://' + server_url + '/websockets/v3';
};

module.exports = {
    getAppId: getAppId,
    getSocketURL: getSocketURL
};

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestLogout = undefined;

var _dao = __webpack_require__(91);

var _dao2 = _interopRequireDefault(_dao);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _socket_cache = __webpack_require__(45);

var _socket_cache2 = _interopRequireDefault(_socket_cache);

var _storage = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestLogout = exports.requestLogout = function requestLogout() {
    _dao2.default.sendLogout().then(doLogout);
};

var doLogout = function doLogout(response) {
    if (response.logout !== 1) return;
    (0, _storage.removeCookies)('affiliate_token', 'affiliate_tracking');
    _client_base2.default.clearAllAccounts();
    _client_base2.default.set('loginid', '');
    _socket_cache2.default.clear();
    window.location.reload();
};

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket_general = __webpack_require__(371);

var _socket_general2 = _interopRequireDefault(_socket_general);

var _network_monitor_base = __webpack_require__(138);

var _network_monitor_base2 = _interopRequireDefault(_network_monitor_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: implement a component to display network status and corresponding messages
var NetworkMonitor = function () {
    var init = function init(client_store) {
        _network_monitor_base2.default.init(_socket_general2.default.init(client_store));
    };

    return {
        init: init
    };
}();

exports.default = NetworkMonitor;

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mobx = __webpack_require__(68);

var _dao = __webpack_require__(91);

var _dao2 = _interopRequireDefault(_dao);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _currency_base = __webpack_require__(52);

var _login = __webpack_require__(38);

var _login2 = _interopRequireDefault(_login);

var _socket_base = __webpack_require__(53);

var _socket_base2 = _interopRequireDefault(_socket_base);

var _storage = __webpack_require__(5);

var _utility = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client_store = void 0;

// TODO: update commented statements to the corresponding functions from app_2
var BinarySocketGeneral = function () {
    var onOpen = function onOpen(is_ready) {
        // Header.hideNotification();
        if (is_ready) {
            if (!_login2.default.isLoginPages()) {
                if (!_client_base2.default.isValidLoginid()) {
                    _client_base2.default.sendLogoutRequest();
                    return;
                }
                _dao2.default.subscribeWebsiteStatus(ResponseHandlers.websiteStatus);
            }
            // Clock.startClock();
        }
    };

    var onMessage = function onMessage(response) {
        handleError(response);
        // Header.hideNotification('CONNECTION_ERROR');
        switch (response.msg_type) {
            case 'authorize':
                if (response.error) {
                    var is_active_tab = sessionStorage.getItem('active_tab') === '1';
                    if ((0, _utility.getPropertyValue)(response, ['error', 'code']) === 'SelfExclusion' && is_active_tab) {
                        sessionStorage.removeItem('active_tab');
                        // Dialog.alert({ id: 'authorize_error_alert', message: response.error.message });
                    }
                    _client_base2.default.sendLogoutRequest(is_active_tab);
                } else if (!_login2.default.isLoginPages() && !/authorize/.test(_storage.State.get('skip_response'))) {
                    if (response.authorize.loginid !== _client_base2.default.get('loginid')) {
                        _client_base2.default.sendLogoutRequest(true);
                    } else {
                        _client_base2.default.responseAuthorize(response);
                        setBalance(response.authorize.balance);
                        _dao2.default.subscribeBalance(ResponseHandlers.balance);
                        _dao2.default.getSettings();
                        _dao2.default.getAccountStatus();
                        _dao2.default.getPayoutCurrencies();
                        _dao2.default.getMt5LoginList();
                        setResidence(response.authorize.country || _client_base2.default.get('residence'));
                        if (!_client_base2.default.get('is_virtual')) {
                            _dao2.default.getSelfExclusion();
                        }
                        _socket_base2.default.sendBuffered();
                        if (/bch/i.test(response.authorize.currency) && !_client_base2.default.get('accepted_bch')) {
                            // showPopup({
                            //     url        : urlFor('user/warning'),
                            //     popup_id   : 'warning_popup',
                            //     form_id    : '#frm_warning',
                            //     content_id : '#warning_content',
                            //     validations: [{ selector: '#chk_accept', validations: [['req', { hide_asterisk: true }]] }],
                            //     onAccept   : () => { Client.set('accepted_bch', 1); },
                            // });
                        }
                    }
                }
                break;
            case 'landing_company':
                // Header.upgradeMessageVisibility();
                break;
            case 'get_self_exclusion':
                // SessionDurationLimit.exclusionResponseHandler(response);
                break;
            case 'get_settings':
                if (response.get_settings) {
                    setResidence(response.get_settings.country_code);
                    _client_base2.default.set('email', response.get_settings.email);
                    // GTM.eventHandler(response.get_settings);
                    // if (response.get_settings.is_authenticated_payment_agent) {
                    //     $('#topMenuPaymentAgent').setVisibility(1);
                    // }
                }
                break;
            // no default
        }
    };

    var setResidence = function setResidence(residence) {
        if (residence) {
            _client_base2.default.set('residence', residence);
            _dao2.default.getLandingCompany(residence);
        }
    };

    var setBalance = (0, _mobx.flow)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(balance) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _socket_base2.default.wait('website_status');

                    case 2:
                        _client_base2.default.set('balance', balance);
                        client_store.balance = balance;

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    var handleError = function handleError(response) {
        var msg_type = response.msg_type;
        var error_code = (0, _utility.getPropertyValue)(response, ['error', 'code']);
        switch (error_code) {
            case 'WrongResponse':
            case 'InternalServerError':
            case 'OutputValidationFailed':
                {
                    if (msg_type !== 'mt5_login_list') {
                        // showNoticeMessage(response.error.message);
                    }
                    break;
                }
            case 'RateLimit':
                if (msg_type !== 'cashier_password') {
                    // Header.displayNotification(localize('You have reached the rate limit of requests per second. Please try later.'), true, 'RATE_LIMIT');
                }
                break;
            case 'InvalidAppID':
                // Header.displayNotification(response.error.message, true, 'INVALID_APP_ID');
                break;
            case 'DisabledClient':
                // showNoticeMessage(response.error.message);
                break;
            // no default
        }
    };

    var init = function init(store) {
        client_store = store;

        return {
            onOpen: onOpen,
            onMessage: onMessage
        };
    };

    return {
        init: init,
        setBalance: setBalance
    };
}();

exports.default = BinarySocketGeneral;


var ResponseHandlers = function () {
    var is_available = false;
    var websiteStatus = function websiteStatus(response) {
        if (response.website_status) {
            is_available = /^up$/i.test(response.website_status.site_status);
            if (is_available && !_socket_base2.default.availability()) {
                window.location.reload();
                return;
            }
            if (response.website_status.message) {
                // Footer.displayNotification(response.website_status.message);
            } else {
                    // Footer.clearNotification();
                }
            _socket_base2.default.availability(is_available);
            (0, _currency_base.setCurrencies)(response.website_status);
        }
    };

    var balance = function balance(response) {
        if (!response.error) {
            BinarySocketGeneral.setBalance(response.balance.balance);
        }
    };

    return {
        websiteStatus: websiteStatus,
        balance: balance
    };
}();

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(92);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactPerfectScrollbar = __webpack_require__(262);

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _gtm = __webpack_require__(60);

var _gtm2 = _interopRequireDefault(_gtm);

var _socket_cache = __webpack_require__(45);

var _socket_cache2 = _interopRequireDefault(_socket_cache);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getAccountInfo = function getAccountInfo(loginid) {
    var currency = _client_base2.default.get('currency', loginid);
    var is_virtual = _client_base2.default.get('is_virtual', loginid);
    var account_type = !is_virtual && currency ? currency : _client_base2.default.getAccountTitle(loginid);
    return {
        loginid: loginid,
        is_virtual: is_virtual,
        icon: account_type.toLowerCase(), // TODO: display the icon
        title: (0, _localize.localize)('[_1] Account', [account_type])
    };
};

var makeAccountsList = function makeAccountsList() {
    return _client_base2.default.getAllLoginids().map(function (loginid) {
        return loginid !== _client_base2.default.get('loginid') && !_client_base2.default.get('is_disabled', loginid) && _client_base2.default.get('token', loginid) ? getAccountInfo(loginid) : undefined;
    }).filter(function (account) {
        return account;
    });
};

var AccountSwitcher = function (_React$PureComponent) {
    _inherits(AccountSwitcher, _React$PureComponent);

    function AccountSwitcher(props) {
        _classCallCheck(this, AccountSwitcher);

        var _this = _possibleConstructorReturn(this, (AccountSwitcher.__proto__ || Object.getPrototypeOf(AccountSwitcher)).call(this, props));

        _this.toggleAccountsList = function () {
            _this.setState({
                is_collapsed: !_this.state.is_collapsed
            });
        };

        _this.switchAccount = function (loginid) {
            if (!loginid || !_client_base2.default.get('token', loginid)) {
                return;
            }

            sessionStorage.setItem('active_tab', '1');
            // set local storage
            _gtm2.default.setLoginFlag();
            _client_base2.default.set('cashier_confirmed', 0);
            _client_base2.default.set('accepted_bch', 0);
            _client_base2.default.set('loginid', loginid);
            _socket_cache2.default.clear();
            window.location.reload();
        };

        _this.state = {
            is_collapsed: false,
            active_account: getAccountInfo(_client_base2.default.get('loginid')),
            accounts_list: makeAccountsList()
        };
        return _this;
    }

    _createClass(AccountSwitcher, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (!_client_base2.default.isLoggedIn()) return false;

            var account_list_collapsed = {
                visibility: '' + (this.state.is_collapsed ? 'visible' : 'hidden')
            };

            var switcher_active_login_class = (0, _classnames2.default)('acc-switcher-active-login', this.state.active_account.icon, {
                'collapsed': this.state.is_collapsed
            });

            var switcher_list_class = (0, _classnames2.default)('acc-switcher-list', {
                'collapsed': this.state.is_collapsed
            });

            return _react2.default.createElement(
                'div',
                { className: 'acc-switcher-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'acc-switcher-header', onClick: this.toggleAccountsList },
                    _react2.default.createElement(
                        'div',
                        { className: switcher_active_login_class },
                        _react2.default.createElement(
                            'p',
                            { className: 'acc-switcher-accountid' },
                            this.state.active_account.loginid
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'acc-switcher-currency' },
                            this.state.active_account.title
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: switcher_list_class,
                        style: account_list_collapsed
                    },
                    _react2.default.createElement(
                        _reactPerfectScrollbar2.default,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'acc-switcher-items' },
                            this.state.accounts_list.map(function (account) {
                                return _react2.default.createElement(
                                    _react2.default.Fragment,
                                    { key: account.loginid },
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: (0, _classnames2.default)('acc-switcher-account', account.icon),
                                            onClick: _this2.switchAccount.bind(null, account.loginid)
                                        },
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'acc-switcher-accountid' },
                                            account.loginid
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'acc-switcher-currency' },
                                            account.title
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AccountSwitcher;
}(_react2.default.PureComponent);

exports.default = AccountSwitcher;

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arrowhead = function Arrowhead(_ref) {
    var className = _ref.className;
    return _react2.default.createElement(
        'svg',
        { className: className, width: '16', height: '16', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement('path', { className: 'arrow-path', d: 'M13.164 5.13a.5.5 0 1 1 .672.74l-5.5 5a.5.5 0 0 1-.672 0l-5.5-5a.5.5 0 0 1 .672-.74L8 9.824l5.164-4.694z', fill: '#D2D3DA', fillRule: 'nonzero' })
    );
};

Arrowhead.propTypes = {
    className: _propTypes2.default.string
};

exports.default = Arrowhead;

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardList = function CardList(_ref) {
    var data_source = _ref.data_source,
        Card = _ref.Card;
    return _react2.default.createElement(
        'div',
        { className: 'card-list' },
        data_source.map(function (transaction, id) {
            return _react2.default.createElement(Card, _extends({ className: 'card-list__card' }, transaction, { key: id }));
        })
    );
};

CardList.propTypes = {
    Card: _propTypes2.default.func,
    data_source: _propTypes2.default.array
};

exports.default = CardList;

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(92);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
      1. implement sorting by column (ASC/DESC)
      2. implement filtering per column
*/

var DataTable = function (_React$Component) {
    _inherits(DataTable, _React$Component);

    function DataTable() {
        _classCallCheck(this, DataTable);

        return _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).apply(this, arguments));
    }

    _createClass(DataTable, [{
        key: 'renderRow',
        value: function renderRow(transaction, id) {
            if (!transaction) return null;
            var defaultRenderCell = function defaultRenderCell(data, data_index) {
                return _react2.default.createElement(
                    'td',
                    { className: data_index, key: data_index },
                    data
                );
            };

            return _react2.default.createElement(
                'tr',
                { className: 'table-row', key: id },
                this.props.columns.map(function (_ref) {
                    var data_index = _ref.data_index,
                        renderCell = _ref.renderCell;

                    var data = transaction[data_index] || '';
                    return (renderCell || defaultRenderCell)(data, data_index, transaction);
                })
            );
        }
    }, {
        key: 'renderBodyRows',
        value: function renderBodyRows() {
            var _this2 = this;

            return this.props.data_source.map(function (transaction, id) {
                return _this2.renderRow(transaction, id);
            });
        }
    }, {
        key: 'renderHeaders',
        value: function renderHeaders() {
            return this.props.columns.map(function (col) {
                return _react2.default.createElement(
                    'th',
                    { className: col.data_index, key: col.data_index },
                    col.title
                );
            });
        }
    }, {
        key: 'renderTableClone',
        value: function renderTableClone() {
            /*
                cloned table with one row for fixed header
                inspired by
                https://stackoverflow.com/questions/4709390
            */
            return _react2.default.createElement(
                'table',
                { className: (0, _classnames2.default)('table', 'table-clone', { 'table--full-width': this.props.is_full_width }) },
                _react2.default.createElement(
                    'thead',
                    { className: 'table-head' },
                    _react2.default.createElement(
                        'tr',
                        { className: 'table-row' },
                        this.renderHeaders()
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    { className: 'table-body' },
                    this.renderRow(this.props.data_source[0], 0)
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var table_class = (0, _classnames2.default)('table', {
                'table--full-width': this.props.is_full_width,
                'table--fixed-header': this.props.has_fixed_header
            });
            return _react2.default.createElement(
                'div',
                { className: 'table-container' },
                this.props.has_fixed_header && this.renderTableClone(),
                _react2.default.createElement(
                    'table',
                    { className: table_class },
                    _react2.default.createElement(
                        'thead',
                        { className: 'table-head' },
                        _react2.default.createElement(
                            'tr',
                            { className: 'table-row' },
                            this.renderHeaders()
                        )
                    ),
                    this.props.footer && _react2.default.createElement(
                        'tfoot',
                        { className: 'table-foot' },
                        this.renderRow(this.props.footer, 0)
                    ),
                    _react2.default.createElement(
                        'tbody',
                        { className: 'table-body' },
                        this.renderBodyRows()
                    )
                )
            );
        }
    }]);

    return DataTable;
}(_react2.default.Component);

DataTable.propTypes = {
    columns: _propTypes2.default.array,
    data_source: _propTypes2.default.array,
    footer: _propTypes2.default.string,
    has_fixed_header: _propTypes2.default.bool,
    is_full_width: _propTypes2.default.bool
};

exports.default = DataTable;

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(92);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _routes = __webpack_require__(117);

var _url = __webpack_require__(9);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleDrawer = function (_React$PureComponent) {
    _inherits(ToggleDrawer, _React$PureComponent);

    function ToggleDrawer(props) {
        _classCallCheck(this, ToggleDrawer);

        var _this = _possibleConstructorReturn(this, (ToggleDrawer.__proto__ || Object.getPrototypeOf(ToggleDrawer)).call(this, props));

        _this.setRef = _this.setRef.bind(_this);
        _this.showDrawer = _this.showDrawer.bind(_this);
        _this.closeDrawer = _this.closeDrawer.bind(_this);
        return _this;
    }

    _createClass(ToggleDrawer, [{
        key: 'setRef',
        value: function setRef(node) {
            this.ref = node;
        }
    }, {
        key: 'showDrawer',
        value: function showDrawer() {
            this.ref.show();
        }
    }, {
        key: 'closeDrawer',
        value: function closeDrawer() {
            this.ref.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var toggle_class = (0, _classnames2.default)('navbar-icons', this.props.icon_class, {
                'menu-toggle': !this.props.icon_class
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: toggle_class, onClick: this.showDrawer },
                    this.props.icon_link ? _react2.default.createElement('img', { src: this.props.icon_link }) : _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/header/menu.svg') })
                ),
                _react2.default.createElement(
                    Drawer,
                    {
                        ref: this.setRef,
                        alignment: this.props.alignment,
                        closeBtn: this.closeDrawer,
                        footer: this.props.footer
                    },
                    this.props.children
                )
            );
        }
    }]);

    return ToggleDrawer;
}(_react2.default.PureComponent);

var Drawer = function (_React$PureComponent2) {
    _inherits(Drawer, _React$PureComponent2);

    function Drawer(props) {
        _classCallCheck(this, Drawer);

        var _this2 = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

        _this2.state = {
            is_drawer_visible: false
        };
        _this2.setRef = _this2.setRef.bind(_this2);
        _this2.show = _this2.show.bind(_this2);
        _this2.hide = _this2.hide.bind(_this2);
        _this2.handleClickOutside = _this2.handleClickOutside.bind(_this2);
        return _this2;
    }

    _createClass(Drawer, [{
        key: 'setRef',
        value: function setRef(node) {
            this.ref = node;
        }
    }, {
        key: 'scrollToggle',
        value: function scrollToggle(state) {
            this.is_open = state;
            document.body.classList.toggle('no-scroll', this.is_open);
        }
    }, {
        key: 'show',
        value: function show() {
            this.setState({ is_drawer_visible: true });
            this.scrollToggle(true);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ is_drawer_visible: false });
            this.scrollToggle(false);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(event) {
            event.stopPropagation();
            if (this.ref && !this.ref.contains(event.target)) {
                this.hide();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var visibility = {
                visibility: '' + (!this.state.is_drawer_visible ? 'hidden' : 'visible')
            };
            var drawer_bg_class = (0, _classnames2.default)('drawer-bg', {
                'show': this.state.is_drawer_visible
            });
            var drawer_class = (0, _classnames2.default)('drawer', {
                'visible': this.state.is_drawer_visible
            }, this.props.alignment);

            var DrawerFooter = this.props.footer;

            return _react2.default.createElement(
                'aside',
                { className: 'drawer-container' },
                _react2.default.createElement(
                    'div',
                    {
                        className: drawer_bg_class,
                        style: visibility,
                        onClick: this.handleClickOutside
                    },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.setRef,
                            className: drawer_class,
                            style: visibility
                        },
                        _react2.default.createElement(DrawerHeader, {
                            alignment: this.props.alignment,
                            closeBtn: this.props.closeBtn
                        }),
                        this.props.children,
                        DrawerFooter && _react2.default.createElement(
                            'div',
                            { className: 'drawer-footer' },
                            _react2.default.createElement(DrawerFooter, null)
                        )
                    )
                )
            );
        }
    }]);

    return Drawer;
}(_react2.default.PureComponent);

var DrawerItems = function (_React$PureComponent3) {
    _inherits(DrawerItems, _React$PureComponent3);

    function DrawerItems(props) {
        _classCallCheck(this, DrawerItems);

        var _this3 = _possibleConstructorReturn(this, (DrawerItems.__proto__ || Object.getPrototypeOf(DrawerItems)).call(this, props));

        _this3.state = {
            is_collapsed: false
        };
        _this3.collapseItems = _this3.collapseItems.bind(_this3);
        return _this3;
    }

    _createClass(DrawerItems, [{
        key: 'collapseItems',
        value: function collapseItems() {
            this.setState({
                is_collapsed: !this.state.is_collapsed
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.items.every(function (item) {
                return !(0, _routes.isRouteVisible)(item.link_to);
            })) return false;

            var list_is_collapsed = {
                visibility: '' + (this.state.is_collapsed ? 'visible' : 'hidden')
            };
            var parent_item_class = (0, _classnames2.default)('parent-item', {
                'show': this.state.is_collapsed
            });
            var drawer_items_class = (0, _classnames2.default)('drawer-items', {
                'show': this.state.is_collapsed
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'drawer-item', onClick: this.collapseItems },
                    _react2.default.createElement(
                        'span',
                        { className: parent_item_class },
                        this.props.text
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: drawer_items_class,
                        style: list_is_collapsed
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'items-group' },
                        this.props.items.map(function (item, idx) {
                            return _react2.default.createElement(DrawerItem, _extends({ key: idx }, item));
                        })
                    )
                )
            );
        }
    }]);

    return DrawerItems;
}(_react2.default.PureComponent);

var DrawerItem = function DrawerItem(_ref) {
    var link_to = _ref.link_to,
        text = _ref.text,
        icon = _ref.icon;
    return (0, _routes.isRouteVisible)(link_to) && _react2.default.createElement(
        'div',
        { className: 'drawer-item' },
        _react2.default.createElement(
            _routes.BinaryLink,
            { to: link_to },
            _react2.default.createElement(
                'span',
                { className: icon || undefined },
                text
            )
        )
    );
};

var DrawerHeader = function DrawerHeader(_ref2) {
    var alignment = _ref2.alignment,
        closeBtn = _ref2.closeBtn;

    var drawer_header_class = (0, _classnames2.default)('drawer-header', alignment);
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        alignment && alignment === 'right' ? _react2.default.createElement(
            'div',
            { className: drawer_header_class },
            _react2.default.createElement(
                'div',
                { className: 'icons btn-close', onClick: closeBtn },
                _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/common/close.svg'), alt: 'Close' })
            )
        ) : _react2.default.createElement(
            'div',
            { className: drawer_header_class },
            _react2.default.createElement(
                'div',
                { className: 'icons btn-close', onClick: closeBtn },
                _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/common/close.svg'), alt: 'Close' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'icons brand-logo' },
                _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/header/binary_logo_dark.svg'), alt: 'Binary.com' })
            )
        )
    );
};

Drawer.propTypes = {
    alignment: _propTypes2.default.string,
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    closeBtn: _propTypes2.default.func,
    footer: _propTypes2.default.func,
    icon_class: _propTypes2.default.string,
    icon_link: _propTypes2.default.string
};

ToggleDrawer.propTypes = {
    alignment: _propTypes2.default.string,
    children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    footer: _propTypes2.default.func,
    icon_class: _propTypes2.default.string,
    icon_link: _propTypes2.default.string
};

DrawerHeader.propTypes = {
    alignment: _propTypes2.default.string,
    closeBtn: _propTypes2.default.func
};

DrawerItems.propTypes = {
    items: _propTypes2.default.array,
    text: _propTypes2.default.string
};

DrawerItem.propTypes = {
    href: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    text: _propTypes2.default.string
};

module.exports = {
    Drawer: Drawer,
    DrawerItem: DrawerItem,
    DrawerItems: DrawerItems,
    ToggleDrawer: ToggleDrawer
};

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LanguageSwitcher = function (_React$PureComponent) {
    _inherits(LanguageSwitcher, _React$PureComponent);

    function LanguageSwitcher(props) {
        _classCallCheck(this, LanguageSwitcher);

        var _this = _possibleConstructorReturn(this, (LanguageSwitcher.__proto__ || Object.getPrototypeOf(LanguageSwitcher)).call(this, props));

        _this.toggleLanguageList = function () {
            _this.setState({
                is_collapsed: !_this.state.is_collapsed
            });
        };

        _this.switchLanguage = function (lang) {
            _this.setState({
                active_language: lang
            });
        };

        _this.state = {
            is_collapsed: false,
            active_language: _this.props.languages[0]
        };
        return _this;
    }

    _createClass(LanguageSwitcher, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var language_list_collapsed = {
                // visibility needed in style props as workaround for briefly flashing hidden elements in css
                display: this.state.is_collapsed ? 'inline-block' : 'none'
            };

            var isLanguageActive = function isLanguageActive(lang) {
                return lang.id === _this2.state.active_language.id;
            };

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'drawer-item', onClick: this.toggleLanguageList },
                    _react2.default.createElement(
                        'span',
                        { className: 'parent-item ' + (this.state.active_language.id || '') },
                        (0, _localize.localize)('Language'),
                        ' : ',
                        this.state.active_language.name
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'lang-switcher-list',
                        style: language_list_collapsed
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'lang-switcher-list-header', onClick: this.toggleLanguageList },
                        _react2.default.createElement(
                            'span',
                            { className: 'lang-switcher-list-desc' },
                            (0, _localize.localize)('Choose your language')
                        )
                    ),
                    this.props.languages.map(function (language, idx) {
                        return _react2.default.createElement(
                            _react2.default.Fragment,
                            { key: idx },
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'lang-switcher-language ' + (isLanguageActive(language) ? 'active' : ''),
                                    onClick: _this2.switchLanguage.bind(null, language)
                                },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'lang-switcher-name' },
                                    language.name
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return LanguageSwitcher;
}(_react2.default.PureComponent);

// TODO: Remove defaultProps


LanguageSwitcher.defaultProps = {
    languages: [{ id: 'EN', name: 'English' }, { id: 'DE', name: 'Deutsch' }, { id: 'FR', name: 'Français' }, { id: 'ID', name: 'Indonesia' }, { id: 'IT', name: 'Italiano' }, { id: 'JA', name: '日本語' }, { id: 'PL', name: 'Polish' }, { id: 'PT', name: 'Português' }, { id: 'RU', name: 'Русский' }, { id: 'TH', name: 'Thai' }, { id: 'VI', name: 'Tiếng Việt' }, { id: 'ZH_CN', name: '简体中文' }, { id: 'ZH_TW', name: '繁體中文' }]
};

LanguageSwitcher.propTypes = {
    languages: _propTypes2.default.array
};

exports.default = LanguageSwitcher;

/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popover = function (_React$Component) {
    _inherits(Popover, _React$Component);

    function Popover(props) {
        _classCallCheck(this, Popover);

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

        _this.state = {
            is_open: false
        };
        return _this;
    }

    _createClass(Popover, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var popover = _react2.default.createElement(
                'div',
                { className: 'popover ' + (this.state.is_open ? 'open' : '') + ' ' + (this.props.alignment ? this.props.alignment : '') },
                this.props.title && _react2.default.createElement(
                    'div',
                    { className: 'popover-title' },
                    (0, _localize.localize)(this.props.title)
                ),
                this.props.subtitle && _react2.default.createElement(
                    'div',
                    { className: 'popover-subtitle' },
                    (0, _localize.localize)(this.props.subtitle)
                )
            );

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, {
                        onMouseEnter: function onMouseEnter() {
                            return _this2.setState({ is_open: true });
                        },
                        onMouseLeave: function onMouseLeave() {
                            return _this2.setState({ is_open: false });
                        }
                    }, popover);
                })
            );
        }
    }]);

    return Popover;
}(_react2.default.Component);

Popover.propTypes = {
    alignment: _propTypes2.default.string,
    children: _propTypes2.default.object,
    subtitle: _propTypes2.default.string,
    title: _propTypes2.default.string
};

exports.default = Popover;

/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortfolioDrawer = function (_React$Component) {
    _inherits(PortfolioDrawer, _React$Component);

    function PortfolioDrawer(props) {
        _classCallCheck(this, PortfolioDrawer);

        var _this = _possibleConstructorReturn(this, (PortfolioDrawer.__proto__ || Object.getPrototypeOf(PortfolioDrawer)).call(this, props));

        _this.handleWindowSizeChange = function () {
            _this.setState({ width: window.innerWidth });
        };

        _this.getIndicative = function (v) {
            var sign = v > 0 ? '+' : '-';
            return {
                value: v,
                display: sign + '$S' + Math.abs(v)
            };
        };

        _this.getRemainingTime = function (epoch) {
            var time_left = parseInt(_moment2.default.unix(epoch) - _this.props.server_time.unix());
            return time_left;
        };

        _this.handleVisibility = _this.handleVisibility.bind(_this);
        _this.state = {
            is_open: true,
            width: window.innerWidth
        };
        return _this;
    }

    _createClass(PortfolioDrawer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            window.addEventListener('resize', this.handleWindowSizeChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowSizeChange);
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({ is_open: !this.state.is_open });
        }

        // TODO: returning correct indicative price & currency


        // TODO: calculate remaining time and render

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var width = this.state.width;

            var is_mobile = width <= 1024;
            var header = is_mobile ? _react2.default.createElement(
                'div',
                {
                    className: 'portfolio-drawer-header',
                    onClick: this.handleVisibility
                },
                _react2.default.createElement('span', { className: 'ic-portfolio' }),
                _react2.default.createElement(
                    'p',
                    null,
                    (0, _localize.localize)('Portfolio')
                ),
                _react2.default.createElement('span', { className: 'ic-close ' + (this.state.is_open ? 'open' : '') })
            ) : _react2.default.createElement(
                'div',
                { className: 'portfolio-drawer-header' },
                _react2.default.createElement('span', { className: 'ic-portfolio' }),
                _react2.default.createElement(
                    'p',
                    null,
                    (0, _localize.localize)('Portfolio Quick Menu')
                ),
                _react2.default.createElement('a', {
                    href: 'javascript:;',
                    className: 'ic-close',
                    onClick: this.props.onClick
                })
            );

            return _react2.default.createElement(
                'div',
                { className: 'portfolio-drawer' },
                header,
                _react2.default.createElement(
                    'div',
                    { className: 'portfolio-list ' + (this.state.is_open ? 'show' : '') },
                    this.props.portfolios.map(function (portfolio, idx) {
                        return _react2.default.createElement(
                            'div',
                            { key: idx, className: 'portfolio' },
                            _react2.default.createElement('span', { className: 'ic-portfolio' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'asset' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'symbol' },
                                    portfolio.symbol
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'indicative-' + (_this2.getIndicative(portfolio.buy_price).value > 0 ? 'positive' : 'negative') },
                                    _this2.getIndicative(portfolio.buy_price).display
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'remaining-time' },
                                    (0, _moment2.default)(_this2.getRemainingTime(portfolio.expiry_time)).format(is_mobile ? 'HH:mm' : 'HH:mm:ss')
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return PortfolioDrawer;
}(_react2.default.Component);

PortfolioDrawer.propTypes = {
    alignment: _propTypes2.default.string,
    children: _propTypes2.default.object,
    onClick: _propTypes2.default.func,
    portfolios: _propTypes2.default.array,
    server_time: _propTypes2.default.object,
    subtitle: _propTypes2.default.number
};

module.exports = PortfolioDrawer;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(24);
var getLanguage = __webpack_require__(15).get;
var isStorageSupported = __webpack_require__(5).isStorageSupported;
var getAppId = __webpack_require__(34).getAppId;

var Login = function () {
    var redirectToLogin = function redirectToLogin() {
        if (!Client.isLoggedIn() && !isLoginPages() && isStorageSupported(sessionStorage)) {
            sessionStorage.setItem('redirect_url', window.location.href);
            window.location.href = loginUrl();
        }
    };

    var loginUrl = function loginUrl() {
        var server_url = localStorage.getItem('config.server_url');
        var language = getLanguage();
        return server_url && /qa/.test(server_url) ? 'https://www.' + server_url.split('.')[1] + '.com/oauth2/authorize?app_id=' + getAppId() + '&l=' + language : 'https://oauth.binary.com/oauth2/authorize?app_id=' + getAppId() + '&l=' + language;
    };

    var isLoginPages = function isLoginPages() {
        return (/logged_inws|redirect/i.test(window.location.pathname)
        );
    };

    var socialLoginUrl = function socialLoginUrl(brand) {
        return loginUrl() + '&social_signup=' + brand;
    };

    return {
        redirectToLogin: redirectToLogin,
        isLoginPages: isLoginPages,
        socialLoginUrl: socialLoginUrl
    };
}();

module.exports = Login;

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(_ref) {
    var message = _ref.message,
        alignment = _ref.alignment,
        children = _ref.children,
        is_icon = _ref.is_icon;
    return _react2.default.createElement(
        'span',
        { className: 'tooltip', 'data-tooltip': message, 'data-tooltip-pos': alignment },
        is_icon ? _react2.default.createElement('i', { className: 'question-mark' }) : children
    );
};

Tooltip.propTypes = {
    alignment: _propTypes2.default.string,
    children: _propTypes2.default.string,
    is_icon: _propTypes2.default.bool,
    message: _propTypes2.default.string
};

exports.default = Tooltip;

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _popover = __webpack_require__(378);

var _popover2 = _interopRequireDefault(_popover);

var _routes = __webpack_require__(117);

var _connect = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TogglePortfolioDrawer = function TogglePortfolioDrawer(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    return _react2.default.createElement(
        _popover2.default,
        {
            subtitle: 'Toggle Portfolio'
        },
        _react2.default.createElement('a', {
            href: 'javascript:;',
            className: '' + (props.is_portfolio_drawer_on ? 'ic-portfolio-active' : 'ic-portfolio'),
            onClick: props.togglePortfolioDrawer
        })
    );
};

var fullscreen_map = {
    event: ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'],
    element: ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'],
    fnc_enter: ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'],
    fnc_exit: ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen']
};

var ToggleFullScreen = function (_React$Component) {
    _inherits(ToggleFullScreen, _React$Component);

    function ToggleFullScreen(props) {
        _classCallCheck(this, ToggleFullScreen);

        var _this = _possibleConstructorReturn(this, (ToggleFullScreen.__proto__ || Object.getPrototypeOf(ToggleFullScreen)).call(this, props));

        _this.onFullScreen = function () {
            var is_full_screen = fullscreen_map.element.some(function (el) {
                return document[el];
            });
            _this.setState({ is_full_screen: is_full_screen });
        };

        _this.toggleFullScreen = _this.toggleFullScreen.bind(_this);
        _this.state = {
            is_full_screen: false
        };
        return _this;
    }

    _createClass(ToggleFullScreen, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            fullscreen_map.event.forEach(function (event) {
                document.addEventListener(event, _this2.onFullScreen, false);
            });
        }
    }, {
        key: 'toggleFullScreen',
        value: function toggleFullScreen(e) {
            e.stopPropagation();

            var to_exit = this.state.is_full_screen;
            var el = to_exit ? document : document.documentElement;
            var fncToCall = fullscreen_map[to_exit ? 'fnc_exit' : 'fnc_enter'].find(function (fnc) {
                return el[fnc];
            });

            if (fncToCall) {
                el[fncToCall]();
            } else {
                this.setState({ is_full_screen: false }); // fullscreen API is not enabled
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _popover2.default,
                {
                    subtitle: 'Toggle Fullscreen',
                    alignment: 'top-right'
                },
                _react2.default.createElement('a', {
                    href: 'javascript:;',
                    className: 'ic-fullscreen',
                    onClick: this.toggleFullScreen
                })
            );
        }
    }]);

    return ToggleFullScreen;
}(_react2.default.Component);

var Footer = function (_React$Component2) {
    _inherits(Footer, _React$Component2);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.items.length && _react2.default.createElement(
                    'div',
                    { className: 'footer-links' },
                    _react2.default.createElement(TogglePortfolioDrawer, this.props),
                    this.props.items.map(function (item, idx) {
                        return _react2.default.createElement(
                            _popover2.default,
                            {
                                key: idx,
                                subtitle: item.text
                            },
                            _react2.default.createElement(
                                _routes.BinaryLink,
                                { key: idx, to: item.link_to, className: item.icon },
                                _react2.default.createElement('span', { title: item.text })
                            )
                        );
                    }),
                    _react2.default.createElement(ToggleFullScreen, null)
                )
            );
        }
    }]);

    return Footer;
}(_react2.default.Component);

Footer.propTypes = {
    items: _propTypes2.default.array
};

TogglePortfolioDrawer.propTypes = {
    is_portfolio_drawer_on: _propTypes2.default.bool,
    togglePortfolioDrawer: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var ui = _ref2.ui;
    return {
        is_portfolio_drawer_on: ui.is_portfolio_drawer_on,
        togglePortfolioDrawer: ui.togglePortfolioDrawer
    };
})(Footer);

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactPerfectScrollbar = __webpack_require__(262);

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _account_switcher = __webpack_require__(372);

var _account_switcher2 = _interopRequireDefault(_account_switcher);

var _drawer = __webpack_require__(376);

var _language_switcher = __webpack_require__(377);

var _language_switcher2 = _interopRequireDefault(_language_switcher);

var _button = __webpack_require__(210);

var _button2 = _interopRequireDefault(_button);

var _common = __webpack_require__(369);

var _routes = __webpack_require__(117);

var _connect = __webpack_require__(33);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _currency_base = __webpack_require__(52);

var _login = __webpack_require__(38);

var _localize = __webpack_require__(2);

var _url = __webpack_require__(9);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuDrawer = function MenuDrawer() {
    return _react2.default.createElement(
        'div',
        { className: 'drawer-items-container' },
        _react2.default.createElement(
            _reactPerfectScrollbar2.default,
            null,
            _react2.default.createElement(
                'div',
                { className: 'list-items-container' },
                _react2.default.createElement(_drawer.DrawerItems, {
                    text: (0, _localize.localize)('Account Settings'),
                    items: [{ text: (0, _localize.localize)('Personal Detail') }, { text: (0, _localize.localize)('Account Authentication') }, { text: (0, _localize.localize)('Financial Assessment') }, { text: (0, _localize.localize)('Professional Trader') }]
                }),
                _react2.default.createElement(_drawer.DrawerItems, {
                    text: (0, _localize.localize)('Security Settings'),
                    items: [{ text: (0, _localize.localize)('Self Exclusion') }, { text: (0, _localize.localize)('Trading Limits') }, { text: (0, _localize.localize)('Authorised Applications') }, { text: (0, _localize.localize)('API Token') }]
                }),
                _react2.default.createElement(_drawer.DrawerItems, {
                    text: (0, _localize.localize)('Trading History'),
                    items: [{ text: (0, _localize.localize)('Portfolio') }, { text: (0, _localize.localize)('Profit Table') }, { text: (0, _localize.localize)('Statement'), link_to: 'statement' }]
                }),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Cashier') }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Manage Password') }),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Useful Resources') }),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Login History') }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_language_switcher2.default, null)
            )
        )
    );
};

var DrawerFooter = function DrawerFooter() {
    return _client_base2.default.isLoggedIn() && // TODO: update the UI
    _react2.default.createElement(
        'a',
        { href: 'javascript:;', onClick: _common.requestLogout },
        (0, _localize.localize)('Log out')
    );
};

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'header',
                    { className: 'shadow' },
                    _react2.default.createElement(
                        'div',
                        { className: 'menu-items' },
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-left' },
                            _react2.default.createElement(
                                _drawer.ToggleDrawer,
                                { alignment: 'left', footer: DrawerFooter },
                                _react2.default.createElement(_account_switcher2.default, null),
                                _react2.default.createElement(MenuDrawer, null)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'navbar-icons binary-logo' },
                                _react2.default.createElement('img', { className: 'logo-img', src: _url2.default.urlForStatic('images/trading_app/header/symbol.svg'), alt: 'Binary.com' })
                            ),
                            !!this.props.items.length && _react2.default.createElement(
                                'div',
                                { className: 'menu-links' },
                                this.props.items.map(function (item, idx) {
                                    return _react2.default.createElement(
                                        _routes.BinaryLink,
                                        { key: idx, to: item.link_to },
                                        _react2.default.createElement(
                                            'span',
                                            { className: item.icon, title: item.text },
                                            item.text
                                        )
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-right' },
                            _react2.default.createElement(AccountBalance, null)
                        ),
                        _react2.default.createElement(
                            _drawer.ToggleDrawer,
                            {
                                icon_class: 'notify-toggle',
                                alignment: 'right',
                                icon_link: _url2.default.urlForStatic('images/trading_app/header/icons/ic_notification_light.svg')
                            },
                            _react2.default.createElement(_drawer.DrawerItem, { text: 'Alert 1' }),
                            _react2.default.createElement(_drawer.DrawerItem, { text: 'Alert 2' }),
                            _react2.default.createElement(_drawer.DrawerItem, { text: 'Alert 3' })
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

var AccountBalance = (0, _connect.connect)(function (_ref) {
    var client = _ref.client;
    return {
        balance: client.balance
    };
})(function (_ref2) {
    var balance = _ref2.balance;

    var loginid = _client_base2.default.get('loginid');
    var currency = _client_base2.default.get('currency');
    var upgrade_info = _client_base2.default.getBasicUpgradeInfo();
    var can_upgrade = upgrade_info.can_upgrade || upgrade_info.can_open_multi;

    return _react2.default.createElement(
        'div',
        { className: 'acc-balance-container' },
        _client_base2.default.isLoggedIn() ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
                'div',
                { className: 'acc-balance' },
                _react2.default.createElement(
                    'p',
                    { className: 'acc-balance-accountid' },
                    loginid
                ),
                typeof balance !== 'undefined' && _react2.default.createElement(
                    'p',
                    { className: 'acc-balance-amount' },
                    _react2.default.createElement(
                        'i',
                        null,
                        _react2.default.createElement('span', { className: 'symbols ' + (currency || '').toLowerCase() })
                    ),
                    (0, _currency_base.formatMoney)(currency, balance, true)
                )
            ),
            can_upgrade && _react2.default.createElement(_button2.default, {
                id: 'acc-balance-btn',
                className: 'primary orange',
                has_effect: true,
                text: (0, _localize.localize)('Upgrade')
                // onClick={onClickUpgrade} TODO
            })
        ) : _react2.default.createElement(_button2.default, {
            className: 'primary green',
            has_effect: true,
            text: (0, _localize.localize)('Login'),
            handleClick: _login.redirectToLogin
        })
    );
});

Header.propTypes = {
    items: _propTypes2.default.array
};

exports.default = Header;

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _socket_base = __webpack_require__(53);

var _socket_base2 = _interopRequireDefault(_socket_base);

var _utility = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A layer over BinarySocket to handle subscribing to streaming calls
 * in order to keep track of subscriptions, manage forget, prevent multiple subscription at the same time, ...
 *
 * structure of the the subscription object is:
 * {
 *     1: { msg_type: 'proposal', request: { ... }, stream_id: '...', subscribers: [ ... ] },
 *     2: ...
 * }
 * object keys: subscription_id that assigned to each subscription
 * msg_type   : msg_type of the request for faster filtering
 * request    : the request object, used to subscribe to the same stream when there is a new subscribe request with exactly the same values
 * stream_id  : id of the stream which stored from its response and used to forget the stream when needed
 * subscribers: an array of callbacks to dispatch the response to
 */
var SubscriptionManager = function () {
    var subscriptions = {};
    var subscription_id = 0;

    /**
     * To submit request for a new subscription
     *
     * @param {String}   msg_type             msg_type of the request
     * @param {Object}   request_obj          the whole object of the request to be made
     * @param {Function} fncCallback          callback function to pass the responses to
     * @param {Boolean}  should_forget_first  when it's true: forgets the previous subscription, then subscribes after receiving the forget response (if any)
     */
    var subscribe = function subscribe(msg_type, request_obj, fncCallback) {
        var should_forget_first = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (should_forget_first) {
            forget(msg_type, fncCallback).then(function () {
                subscribe(msg_type, request_obj, fncCallback);
            });
            return;
        }

        var sub_id = Object.keys(subscriptions).find(function (id) {
            return (0, _utility.isDeepEqual)(request_obj, subscriptions[id].request);
        });

        if (!sub_id) {
            sub_id = ++subscription_id;

            subscriptions[sub_id] = {
                msg_type: msg_type,
                request: (0, _utility.cloneObject)(request_obj),
                stream_id: '', // stream_id will be updated after receiving the response
                subscribers: [fncCallback]
            };

            _socket_base2.default.send(request_obj, {
                callback: function (id) {
                    return function (response) {
                        dispatch(response, id);
                    };
                }(sub_id)
            });
        } else if (!hasCallbackFunction(sub_id, fncCallback)) {
            // there is already an active subscription for the very same request which fncCallback is not subscribed to it yet
            subscriptions[sub_id].subscribers.push(fncCallback);
        }
    };

    // dispatches the response to subscribers of the specific subscription id (internal use only)
    var dispatch = function dispatch(response, sub_id) {
        var stream_id = (0, _utility.getPropertyValue)(response, [response.msg_type, 'id']);

        if (!subscriptions[sub_id]) {
            forgetStream(stream_id);
            return;
        }

        var sub_info = subscriptions[sub_id];
        // set the stream_id
        if (!sub_info.stream_id && stream_id) {
            sub_info.stream_id = stream_id;
        }

        // callback subscribers
        var subscribers = sub_info.subscribers;
        if (subscribers.length) {
            if (response.error && !sub_info.stream_id) {
                // first response returned error
                delete subscriptions[sub_id];
            }
            sub_info.subscribers.forEach(function (fnc) {
                fnc(response);
            });
        } else {
            delete subscriptions[sub_id];
            forgetStream(sub_info.stream_id);
        }
    };

    /**
     * To forget a subscription which submitted for a specific callback function
     *
     * @param  {String}   msg_type      msg_type to forget
     * @param  {Function} fncCallback   the same function passed to subscribe()
     *     (this is the way to distinguish between different subscribers of the same stream at the same time)
     * @param  {Object}   match_values  optional, to only forget subscriptions having request that "contains" provided values
     * @return {Promise}  the promise object of all possible forget requests
     */
    var forget = function forget(msg_type, fncCallback, match_values) {
        if (typeof fncCallback !== 'function') {
            throw new Error('Missing callback function. To forget all subscriptions of msg_type: ' + msg_type + ', please call forgetAll().');
        }

        // find corresponding id(s)
        var sub_ids = Object.keys(subscriptions).filter(function (id) {
            return subscriptions[id].msg_type === msg_type && hasCallbackFunction(id, fncCallback);
        });

        var forgets_list = [];
        sub_ids.forEach(function (id) {
            if (match_values && !hasValues(subscriptions[id].request, match_values)) {
                return;
            }
            var stream_id = subscriptions[id].stream_id;
            if (stream_id && subscriptions[id].subscribers.length === 1) {
                delete subscriptions[id];
                forgets_list.push(forgetStream(stream_id));
            } else {
                // there are other subscribers, or for some reason there is no stream_id:
                // (i.e. returned an error, or forget() being called before the first response)
                subscriptions[id].subscribers.splice(subscriptions[id].subscribers.indexOf(fncCallback), 1);
            }
        });
        return Promise.all(forgets_list);
    };

    /**
     * To forget all active subscriptions of a list of msg_types
     *
     * @param  {String}  msg_types  list of msg_types to forget
     * @return {Promise} the promise object of all possible forget_all requests
     */
    var forgetAll = function forgetAll() {
        for (var _len = arguments.length, msg_types = Array(_len), _key = 0; _key < _len; _key++) {
            msg_types[_key] = arguments[_key];
        }

        var types_to_forget = {};

        msg_types.forEach(function (msg_type) {
            var sub_ids = Object.keys(subscriptions).filter(function (id) {
                return subscriptions[id].msg_type === msg_type;
            });
            if (sub_ids.length) {
                sub_ids.forEach(function (id) {
                    delete subscriptions[id];
                });
                types_to_forget[msg_type] = true;
            }
        });

        return Promise.resolve(!(0, _utility.isEmptyObject)(types_to_forget) ? _socket_base2.default.send({ forget_all: Object.keys(types_to_forget) }) : {});
    };

    var forgetStream = function forgetStream(stream_id) {
        return Promise.resolve(stream_id ? _socket_base2.default.send({ forget: stream_id }) : {});
    };

    var hasCallbackFunction = function hasCallbackFunction(sub_id, fncCallback) {
        return subscriptions[sub_id] && subscriptions[sub_id].subscribers.indexOf(fncCallback) !== -1;
    };

    var hasValues = function hasValues(request_obj, values_obj) {
        return (typeof request_obj === 'undefined' ? 'undefined' : _typeof(request_obj)) === 'object' && (typeof values_obj === 'undefined' ? 'undefined' : _typeof(values_obj)) === 'object' && Object.keys(values_obj).every(function (key) {
            return request_obj[key] === values_obj[key];
        });
    };

    return {
        subscribe: subscribe,
        forget: forget,
        forgetAll: forgetAll
    };
}();

exports.default = SubscriptionManager;

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(136);

__webpack_require__(137);

var _app = __webpack_require__(276);

var _app2 = _interopRequireDefault(_app);

var _check_new_release = __webpack_require__(109);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.check_new_release = _check_new_release.checkNewRelease; // used by GTM to update page after a new release

document.addEventListener('DOMContentLoaded', _app2.default);
window.addEventListener('pageshow', function (e) {
    // Safari doesn't fire load event when using back button
    if (e.persisted) {
        (0, _app2.default)();
    }
});

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _classnames = __webpack_require__(92);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dao = __webpack_require__(91);

var _dao2 = _interopRequireDefault(_dao);

var _connect = __webpack_require__(33);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _currency_base = __webpack_require__(52);

var _localize = __webpack_require__(2);

var _string_util = __webpack_require__(19);

var _card_list = __webpack_require__(374);

var _card_list2 = _interopRequireDefault(_card_list);

var _data_table = __webpack_require__(375);

var _data_table2 = _interopRequireDefault(_data_table);

var _date_picker = __webpack_require__(211);

var _date_picker2 = _interopRequireDefault(_date_picker);

var _loading = __webpack_require__(418);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
      1. to separate logic from UI
      3. to handle errors
*/
var getStatementData = function getStatementData(statement, currency) {
    var date_obj = new Date(statement.transaction_time * 1000);
    var moment_obj = _moment2.default.utc(date_obj);
    var date_str = moment_obj.format('YYYY-MM-DD');
    var time_str = moment_obj.format('HH:mm:ss') + ' GMT';
    var payout = parseFloat(statement.payout);
    var amount = parseFloat(statement.amount);
    var balance = parseFloat(statement.balance_after);
    var should_exclude_currency = true;

    return {
        action: (0, _localize.localize)((0, _string_util.toTitleCase)(statement.action_type)),
        date: date_str + '\n' + time_str,
        refid: statement.transaction_id,
        payout: isNaN(payout) ? '-' : (0, _currency_base.formatMoney)(currency, payout, should_exclude_currency),
        amount: isNaN(amount) ? '-' : (0, _currency_base.formatMoney)(currency, amount, should_exclude_currency),
        balance: isNaN(balance) ? '-' : (0, _currency_base.formatMoney)(currency, balance, should_exclude_currency),
        desc: (0, _localize.localize)(statement.longcode.replace(/\n/g, '<br />')),
        id: statement.contract_id,
        app_id: statement.app_id
    };
};

var StatementCard = function StatementCard(_ref) {
    var date = _ref.date,
        refid = _ref.refid,
        desc = _ref.desc,
        action = _ref.action,
        amount = _ref.amount,
        payout = _ref.payout,
        balance = _ref.balance,
        className = _ref.className;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('statement-card', className) },
        _react2.default.createElement(
            'div',
            { className: 'statement-card__header' },
            _react2.default.createElement(
                'span',
                { className: 'statement-card__date' },
                date
            ),
            _react2.default.createElement(
                'span',
                { className: 'statement-card__refid' },
                refid
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'statement-card__body' },
            _react2.default.createElement(
                'div',
                { className: 'statement-card__desc' },
                desc
            ),
            _react2.default.createElement(
                'div',
                { className: 'statement-card__row' },
                _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('statement-card__cell statement-card__amount', {
                            'statement-card__amount--buy': action === 'Buy',
                            'statement-card__amount--sell': action === 'Sell',
                            'statement-card__amount--deposit': action === 'Deposit',
                            'statement-card__amount--withdrawal': action === 'Withdrawal'
                        })
                    },
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-card__cell-text' },
                        amount
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'statement-card__cell statement-card__payout' },
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-card__cell-text' },
                        payout
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'statement-card__cell statement-card__balance' },
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-card__cell-text' },
                        balance
                    )
                )
            )
        )
    );
};

var Statement = function (_React$PureComponent) {
    _inherits(Statement, _React$PureComponent);

    function Statement(props) {
        _classCallCheck(this, Statement);

        var _this = _possibleConstructorReturn(this, (Statement.__proto__ || Object.getPrototypeOf(Statement)).call(this, props));

        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.handleDateChange = _this.handleDateChange.bind(_this);
        _this.loadNextChunk = _this.loadNextChunk.bind(_this);
        _this.fetchNextBatch = _this.fetchNextBatch.bind(_this);
        _this.reloadTable = _this.reloadTable.bind(_this);

        var columns = [{
            title: (0, _localize.localize)('Date'),
            data_index: 'date'
        }, {
            title: (0, _localize.localize)('Ref.'),
            data_index: 'refid'
            // TODO: add data balloon later
            // renderCell: (data, data_index, transaction) => {
            //     return (
            //         <td key={data_index} className={data_index}>
            //             <span
            //                 data-balloon={transaction.app_id}
            //             >{data}</span>
            //         </td>
            //     );
            // },
        }, {
            title: (0, _localize.localize)('Description'),
            data_index: 'desc'
        }, {
            title: (0, _localize.localize)('Action'),
            data_index: 'action'
        }, {
            title: (0, _localize.localize)('Potential Payout'),
            data_index: 'payout'
        }, {
            title: (0, _localize.localize)('Credit/Debit'),
            data_index: 'amount',
            renderCell: function renderCell(data, data_index) {
                var parseStrNum = function parseStrNum(str) {
                    return parseFloat(str.replace(',', '.'));
                };
                return _react2.default.createElement(
                    'td',
                    {
                        key: data_index,
                        className: data_index + ' ' + (parseStrNum(data) >= 0 ? 'profit' : 'loss')
                    },
                    data
                );
            }
        }, {
            title: (0, _localize.localize)('Balance'),
            data_index: 'balance'
        }];

        _this.state = {
            columns: columns,
            data_source: [],
            pending_request: false,
            has_loaded_all: false,
            chunks: 1,
            date_from: '',
            date_to: ''
        };
        return _this;
    }

    _createClass(Statement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // BinarySocket.send({ oauth_apps: 1 }).then((response) => {
            //     this.oauth_apps = buildOauthApps(response);
            //     console.log(this.oauth_apps);
            // });

            this.fetchNextBatch();

            window.addEventListener('scroll', this.handleScroll, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll, false);
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll() {
            var _document$scrollingEl = document.scrollingElement,
                scrollTop = _document$scrollingEl.scrollTop,
                scrollHeight = _document$scrollingEl.scrollHeight,
                clientHeight = _document$scrollingEl.clientHeight;

            var left_to_scroll = scrollHeight - (scrollTop + clientHeight);

            if (left_to_scroll < 1000) {
                this.loadNextChunk();
            }
        }
    }, {
        key: 'handleDateChange',
        value: function handleDateChange(e) {
            if (e.target.value !== this.state[e.target.name]) {
                this.reloadTable();
            }
            this.setState(_defineProperty({}, e.target.name, e.target.value));
        }
    }, {
        key: 'loadNextChunk',
        value: function loadNextChunk() {
            var chunk_size = this.props.chunk_size;
            var _state = this.state,
                chunks = _state.chunks,
                data_source = _state.data_source;


            if (data_source.length <= chunks * chunk_size) {
                // all content is shown
                return;
            }

            this.setState({ chunks: chunks + 1 });

            if (data_source.length <= (chunks + 1) * chunk_size) {
                // last chunk has been loaded
                this.fetchNextBatch();
            }
        }
    }, {
        key: 'fetchNextBatch',
        value: function fetchNextBatch() {
            var _this2 = this;

            if (this.state.has_loaded_all || this.state.pending_request) return;

            this.setState({ pending_request: true });

            var currency = _client_base2.default.get('currency');

            var _state2 = this.state,
                date_from = _state2.date_from,
                date_to = _state2.date_to;


            _dao2.default.getStatement(this.props.batch_size, this.state.data_source.length, _extends({}, date_from && { date_from: (0, _moment2.default)(date_from).unix() }, date_to && { date_to: (0, _moment2.default)(date_to).add(1, 'd').subtract(1, 's').unix() })).then(function (response) {
                if (!_this2.el) return;

                var formatted_transactions = response.statement.transactions.map(function (transaction) {
                    return getStatementData(transaction, currency);
                });

                _this2.setState({
                    data_source: [].concat(_toConsumableArray(_this2.state.data_source), _toConsumableArray(formatted_transactions)),
                    has_loaded_all: formatted_transactions.length < _this2.props.batch_size,
                    pending_request: false
                });
            });
        }
    }, {
        key: 'reloadTable',
        value: function reloadTable() {
            this.setState({
                data_source: [],
                has_loaded_all: false,
                pending_request: false,
                chunks: 1
            }, this.fetchNextBatch);
        }
    }, {
        key: 'renderNoActivityMessage',
        value: function renderNoActivityMessage() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'statement__no-activity-msg' },
                    !this.state.date_from && !this.state.date_to ? (0, _localize.localize)('Your account has no trading activity.') : (0, _localize.localize)('Your account has no trading activity for the selected period.')
                )
            );
        }
    }, {
        key: 'renderFilter',
        value: function renderFilter(is_mobile) {
            var moment_now = (0, _moment2.default)(this.props.server_time);
            var today = moment_now.format('YYYY-MM-DD');
            var filter_class = (0, _classnames2.default)('statement-filter', {
                'mobile-only': is_mobile,
                'desktop-only': !is_mobile
            });

            return _react2.default.createElement(
                'div',
                { className: filter_class },
                _react2.default.createElement(
                    'div',
                    { className: 'statement-filter__content container' },
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-filter__label' },
                        (0, _localize.localize)('Filter by date:')
                    ),
                    _react2.default.createElement(_date_picker2.default, {
                        name: 'date_from',
                        initial_value: '',
                        placeholder: (0, _localize.localize)('Start date'),
                        startDate: this.state.date_to || today,
                        maxDate: this.state.date_to || today,
                        onChange: this.handleDateChange,
                        is_nativepicker: is_mobile
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'statement-filter__dash' },
                        '\u2014'
                    ),
                    _react2.default.createElement(_date_picker2.default, {
                        name: 'date_to',
                        initial_value: '',
                        placeholder: (0, _localize.localize)('End date'),
                        startDate: today,
                        minDate: this.state.date_from,
                        maxDate: today,
                        showTodayBtn: true,
                        onChange: this.handleDateChange,
                        is_nativepicker: is_mobile
                    })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var is_loading = this.state.pending_request && this.state.data_source.length === 0;

            return _react2.default.createElement(
                'div',
                { className: 'statement', ref: function ref(el) {
                        return _this3.el = el;
                    } },
                this.renderFilter(false),
                this.renderFilter(true),
                _react2.default.createElement(
                    'div',
                    { className: 'statement__content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'desktop-only' },
                        _react2.default.createElement(_data_table2.default, {
                            data_source: this.state.data_source.slice(0, this.state.chunks * this.props.chunk_size),
                            columns: this.state.columns,
                            has_fixed_header: true,
                            is_full_width: true
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'mobile-only' },
                        _react2.default.createElement(_card_list2.default, {
                            data_source: this.state.data_source.slice(0, this.state.chunks * this.props.chunk_size),
                            Card: StatementCard
                        })
                    ),
                    is_loading && _react2.default.createElement(_loading2.default, null) || this.state.data_source.length === 0 && this.renderNoActivityMessage()
                )
            );
        }
    }]);

    return Statement;
}(_react2.default.PureComponent);

Statement.defaultProps = {
    batch_size: 200, // request with batches
    chunk_size: 50 // display with chunks
};

StatementCard.propTypes = {
    action: _propTypes2.default.string,
    amount: _propTypes2.default.string,
    balance: _propTypes2.default.string,
    className: _propTypes2.default.string,
    date: _propTypes2.default.string,
    desc: _propTypes2.default.string,
    payout: _propTypes2.default.string,
    refid: _propTypes2.default.string
};

Statement.propTypes = {
    batch_size: _propTypes2.default.number,
    chunk_size: _propTypes2.default.number,
    server_time: _propTypes2.default.object
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        server_time: trade.server_time
    };
})(Statement);

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeContractType = exports.onChangeContractTypeList = undefined;

var _contract_type = __webpack_require__(102);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeContractTypeList = exports.onChangeContractTypeList = function onChangeContractTypeList(_ref) {
    var contract_type = _ref.contract_type,
        contract_types_list = _ref.contract_types_list;
    return _contract_type2.default.getContractType(contract_types_list, contract_type);
};

var onChangeContractType = exports.onChangeContractType = function onChangeContractType(_ref2) {
    var contract_type = _ref2.contract_type,
        contract_expiry_type = _ref2.contract_expiry_type,
        duration_unit = _ref2.duration_unit;
    return _contract_type2.default.getContractValues(contract_type, contract_expiry_type, duration_unit);
};

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrenciesAsync = undefined;

var _dao = __webpack_require__(91);

var _dao2 = _interopRequireDefault(_dao);

var _currency_base = __webpack_require__(52);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getCurrenciesAsync = /*#__PURE__*/exports.getCurrenciesAsync = regeneratorRuntime.mark(function getCurrenciesAsync(_ref) {
    var _currencies_list;

    var currency = _ref.currency;
    var r, fiat, crypto, fields;
    return regeneratorRuntime.wrap(function getCurrenciesAsync$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _dao2.default.getPayoutCurrencies();

                case 2:
                    r = _context.sent;
                    fiat = [];
                    crypto = [];


                    r.payout_currencies.forEach(function (cur) {
                        ((0, _currency_base.isCryptocurrency)(cur) ? crypto : fiat).push({ text: cur, value: cur });
                    });

                    fields = {
                        currencies_list: (_currencies_list = {}, _defineProperty(_currencies_list, (0, _localize.localize)('Fiat Currency'), fiat), _defineProperty(_currencies_list, (0, _localize.localize)('Cryptocurrency'), crypto), _currencies_list)
                    };


                    if (!currency) {
                        fields.currency = Object.values(fields.currencies_list).reduce(function (a, b) {
                            return [].concat(_toConsumableArray(a), _toConsumableArray(b));
                        }).find(function (c) {
                            return c;
                        }).value;
                    }

                    return _context.abrupt('return', fields);

                case 9:
                case 'end':
                    return _context.stop();
            }
        }
    }, getCurrenciesAsync, this);
});

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeExpiry = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _contract_type = __webpack_require__(102);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeExpiry = exports.onChangeExpiry = function onChangeExpiry(_ref) {
    var expiry_type = _ref.expiry_type,
        duration_unit = _ref.duration_unit,
        expiry_date = _ref.expiry_date,
        expiry_time = _ref.expiry_time,
        contract_type = _ref.contract_type,
        server_time = _ref.server_time;

    // TODO: for contracts that only have daily, date_expiry should have a minimum of daily, not intraday
    var contract_expiry_type = expiry_type === 'duration' && duration_unit === 'd' ? 'daily' : 'intraday';

    if (expiry_type === 'endtime') {
        var time = ((expiry_time.split(' ') || [])[0] || '').split(':');
        var expires = (0, _moment2.default)(expiry_date).utc();
        if (time.length > 1) {
            expires.hour(time[0]).minute(time[1]);
        }
        if (expires.diff((0, _moment2.default)(server_time).utc(), 'days') >= 1) {
            contract_expiry_type = 'daily';
        }
    }

    return _extends({
        contract_expiry_type: contract_expiry_type
    }, contract_type && _contract_type2.default.getBarriers(contract_type, contract_expiry_type));
};

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _localize = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var duration_maps = {
    t: { display: 'ticks', order: 1 },
    s: { display: 'seconds', order: 2, to_second: 1 },
    m: { display: 'minutes', order: 3, to_second: 60 },
    h: { display: 'hours', order: 4, to_second: 60 * 60 },
    d: { display: 'days', order: 5, to_second: 60 * 60 * 24 }
};

var buildDurationConfig = function buildDurationConfig() {
    var durations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { min_max: {}, units_display: {} };
    var contract = arguments[1];

    durations.min_max[contract.start_type] = durations.min_max[contract.start_type] || {};
    durations.units_display[contract.start_type] = durations.units_display[contract.start_type] || [];

    var obj_min = getDurationFromString(contract.min_contract_duration);
    var obj_max = getDurationFromString(contract.max_contract_duration);

    durations.min_max[contract.start_type][contract.expiry_type] = {
        min: convertDurationUnit(obj_min.duration, obj_min.unit, 's'),
        max: convertDurationUnit(obj_max.duration, obj_max.unit, 's')
    };

    var arr_units = [];
    durations.units_display[contract.start_type].forEach(function (obj) {
        arr_units.push(obj.value);
    });
    if (/^tick|daily$/.test(contract.expiry_type)) {
        if (arr_units.indexOf(obj_min.unit) === -1) {
            arr_units.push(obj_min.unit);
        }
    } else {
        Object.keys(duration_maps).forEach(function (u) {
            if (arr_units.indexOf(u) === -1 && duration_maps[u].order >= duration_maps[obj_min.unit].order && duration_maps[u].order <= duration_maps[obj_max.unit].order) {
                arr_units.push(u);
            }
        });
    }

    durations.units_display[contract.start_type] = arr_units.sort(function (a, b) {
        return duration_maps[a].order > duration_maps[b].order ? 1 : -1;
    }).reduce(function (o, c) {
        return [].concat(_toConsumableArray(o), [{ text: (0, _localize.localize)(duration_maps[c].display), value: c }]);
    }, []);

    return durations;
};

var convertDurationUnit = function convertDurationUnit(value, from_unit, to_unit) {
    if (!value || !from_unit || !to_unit) return null;
    if (from_unit === to_unit || !('to_second' in duration_maps[from_unit])) return value;
    return value * duration_maps[from_unit].to_second / duration_maps[to_unit].to_second;
};

var getDurationFromString = function getDurationFromString(duration_string) {
    var duration = duration_string.toString().match(/[a-zA-Z]+|[0-9]+/g);
    return {
        duration: duration[0],
        unit: duration[1]
    };
};

module.exports = {
    buildDurationConfig: buildDurationConfig
};

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
          value: true
});
exports.onChangeStartDate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _contract_type = __webpack_require__(102);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeStartDate = exports.onChangeStartDate = function onChangeStartDate(_ref) {
          var contract_type = _ref.contract_type,
              start_date = _ref.start_date,
              duration_unit = _ref.duration_unit;

          var obj_contract_start_type = _contract_type2.default.getStartType(start_date);
          var obj_duration_units_list = _contract_type2.default.getDurationUnitsList(contract_type, obj_contract_start_type.contract_start_type);
          var obj_duration_unit = _contract_type2.default.getDurationUnit(duration_unit, contract_type, obj_contract_start_type.contract_start_type);

          return _extends({}, obj_contract_start_type, obj_duration_units_list, obj_duration_unit);
};

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeSymbolAsync = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _test = __webpack_require__(214);

var _contract_type = __webpack_require__(102);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeSymbolAsync = /*#__PURE__*/exports.onChangeSymbolAsync = regeneratorRuntime.mark(function onChangeSymbolAsync(_ref) {
    var symbol = _ref.symbol,
        contract_type = _ref.contract_type,
        contract_expiry_type = _ref.contract_expiry_type,
        duration_unit = _ref.duration_unit;
    var contract_types_list, new_contract_type;
    return regeneratorRuntime.wrap(function onChangeSymbolAsync$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _contract_type2.default.buildContractTypesConfig(symbol);

                case 2:

                    (0, _test.getTicks)({ symbol: symbol }, function () {});

                    contract_types_list = _contract_type2.default.getContractCategories();
                    new_contract_type = _contract_type2.default.getContractType(contract_types_list, contract_type).contract_type;

                    // always return the new contract type list
                    // if contract type hasn't changed, update any contract values that might have changed.
                    // if contract type has changed, let onChangeContractType handle updating values

                    return _context.abrupt('return', _extends({
                        contract_types_list: contract_types_list
                    }, new_contract_type === contract_type && _contract_type2.default.getContractValues(contract_type, contract_expiry_type, duration_unit)));

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, onChangeSymbolAsync, this);
});

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dropdown = __webpack_require__(116);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(101);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _input_field = __webpack_require__(153);

var _input_field2 = _interopRequireDefault(_input_field);

var _connect = __webpack_require__(33);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

var _currency_base = __webpack_require__(52);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basis_list = [{ text: (0, _localize.localize)('Payout'), value: 'payout' }, { text: (0, _localize.localize)('Stake'), value: 'stake' }];

var Amount = function Amount(_ref) {
    var basis = _ref.basis,
        currency = _ref.currency,
        currencies_list = _ref.currencies_list,
        amount = _ref.amount,
        onChange = _ref.onChange,
        is_minimized = _ref.is_minimized,
        is_nativepicker = _ref.is_nativepicker;

    if (is_minimized) {
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized amount' },
            _react2.default.createElement('span', { className: 'icon invest-amount' }),
            _react2.default.createElement(
                'span',
                { className: 'fieldset-minimized__basis' },
                (basis_list.find(function (o) {
                    return o.value === basis;
                }) || {}).text
            ),
            '\xA0',
            _react2.default.createElement(
                'i',
                null,
                _react2.default.createElement('span', { className: 'symbols ' + (currency || '').toLowerCase() })
            ),
            (0, _currency_base.addComma)(amount, 2)
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            header: (0, _localize.localize)('Invest Amount'),
            icon: 'invest-amount',
            tooltip: (0, _localize.localize)('Text for Invest Amount goes here.')
        },
        _react2.default.createElement(
            'div',
            { className: 'amount-container' },
            _react2.default.createElement(_dropdown2.default, {
                list: basis_list,
                value: basis,
                name: 'basis',
                onChange: onChange,
                is_nativepicker: is_nativepicker
            }),
            _react2.default.createElement(_input_field2.default, {
                type: 'number',
                name: 'amount',
                value: amount,
                onChange: onChange,
                is_currency: true,
                prefix: currency,
                is_nativepicker: is_nativepicker
            })
        ),
        !_client_base2.default.get('currency') && _react2.default.createElement(_dropdown2.default, {
            list: currencies_list,
            value: currency,
            name: 'currency',
            onChange: onChange,
            is_nativepicker: is_nativepicker
        })
    );
};

Amount.propTypes = {
    amount: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    basis: _propTypes2.default.string,
    currencies_list: _propTypes2.default.object,
    currency: _propTypes2.default.string,
    is_minimized: _propTypes2.default.bool,
    is_nativepicker: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        basis: trade.basis,
        currency: trade.currency,
        currencies_list: trade.currencies_list,
        amount: trade.amount,
        onChange: trade.handleChange
    };
})(Amount);

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fieldset = __webpack_require__(101);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _input_field = __webpack_require__(153);

var _input_field2 = _interopRequireDefault(_input_field);

var _connect = __webpack_require__(33);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Barrier = function Barrier(_ref) {
    var barrier_1 = _ref.barrier_1,
        barrier_2 = _ref.barrier_2,
        onChange = _ref.onChange,
        is_minimized = _ref.is_minimized;

    if (is_minimized) {
        if (!barrier_2) {
            return _react2.default.createElement(
                'div',
                { className: 'fieldset-minimized barrier1' },
                _react2.default.createElement('span', { className: 'icon barriers' }),
                barrier_1
            );
        }
        return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
                'div',
                { className: 'fieldset-minimized barrier1' },
                _react2.default.createElement('span', { className: 'icon barriers' }),
                barrier_1
            ),
            _react2.default.createElement(
                'div',
                { className: 'fieldset-minimized barrier2' },
                _react2.default.createElement('span', { className: 'icon barriers' }),
                barrier_2
            )
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            header: (0, _localize.localize)(barrier_2 ? 'High barrier' : 'Barrier'),
            icon: 'barriers',
            tooltip: (0, _localize.localize)('Text for Barriers goes here.')
        },
        _react2.default.createElement(_input_field2.default, {
            type: 'number',
            name: 'barrier_1',
            value: barrier_1,
            onChange: onChange
        }),
        !!barrier_2 && _react2.default.createElement(_input_field2.default, {
            type: 'number',
            name: 'barrier_2',
            value: barrier_2,
            onChange: onChange,
            is_currency: true
        })
    );
};

Barrier.propTypes = {
    barrier_1: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    barrier_2: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    is_minimized: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        barrier_1: trade.barrier_1,
        barrier_2: trade.barrier_2,
        onChange: trade.handleChange
    };
})(Barrier);

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _contracts_popup = __webpack_require__(396);

var _contracts_popup2 = _interopRequireDefault(_contracts_popup);

var _connect = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Contract = function Contract(_ref) {
    var contract_type = _ref.contract_type,
        contract_types_list = _ref.contract_types_list,
        onChange = _ref.onChange,
        other = _objectWithoutProperties(_ref, ['contract_type', 'contract_types_list', 'onChange']);

    return _react2.default.createElement(_contracts_popup2.default, _extends({
        name: 'contract_type',
        list: contract_types_list,
        value: contract_type,
        onChange: onChange
    }, other));
};

Contract.propTypes = {
    contract_type: _propTypes2.default.string,
    contract_types_list: _propTypes2.default.object,
    onChange: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        contract_type: trade.contract_type,
        contract_types_list: trade.contract_types_list,
        onChange: trade.handleChange
    };
})(Contract);

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _date_picker = __webpack_require__(211);

var _date_picker2 = _interopRequireDefault(_date_picker);

var _dropdown = __webpack_require__(116);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(101);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _input_field = __webpack_require__(153);

var _input_field2 = _interopRequireDefault(_input_field);

var _time_picker = __webpack_require__(212);

var _time_picker2 = _interopRequireDefault(_time_picker);

var _connect = __webpack_require__(33);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expiry_list = [{ text: (0, _localize.localize)('Duration'), value: 'duration' }, { text: (0, _localize.localize)('End Time'), value: 'endtime' }];

var min_date_duration = void 0,
    max_date_duration = void 0,
    min_date_expiry = void 0;

var Duration = function Duration(_ref) {
    var expiry_type = _ref.expiry_type,
        expiry_date = _ref.expiry_date,
        expiry_time = _ref.expiry_time,
        duration = _ref.duration,
        duration_unit = _ref.duration_unit,
        duration_units_list = _ref.duration_units_list,
        server_time = _ref.server_time,
        onChange = _ref.onChange,
        is_nativepicker = _ref.is_nativepicker,
        is_minimized = _ref.is_minimized;

    var moment_now = (0, _moment2.default)(server_time);
    if (!min_date_expiry || moment_now.date() !== min_date_expiry.date()) {
        min_date_duration = moment_now.clone().add(1, 'd');
        max_date_duration = moment_now.clone().add(365, 'd');
        min_date_expiry = moment_now.clone();
    }
    if (is_minimized) {
        var duration_unit_text = (duration_units_list.find(function (o) {
            return o.value === duration_unit;
        }) || {}).text;
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized duration' },
            _react2.default.createElement('span', { className: 'icon trade-duration' }),
            expiry_type === 'duration' ? duration + ' ' + duration_unit_text : (0, _moment2.default)(expiry_date).format('ddd - DD MMM, YYYY') + '\n' + expiry_time
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            time: server_time,
            header: (0, _localize.localize)('Trade Duration'),
            icon: 'trade-duration',
            tooltip: (0, _localize.localize)('Text for Duration goes here.')
        },
        _react2.default.createElement(_dropdown2.default, {
            list: expiry_list,
            value: expiry_type,
            name: 'expiry_type',
            onChange: onChange,
            is_nativepicker: is_nativepicker
        }),
        expiry_type === 'duration' ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
                'div',
                { className: 'duration-container' },
                duration_unit === 'd' && !is_nativepicker ? _react2.default.createElement(_date_picker2.default, {
                    name: 'duration',
                    minDate: min_date_duration,
                    maxDate: max_date_duration,
                    mode: 'duration',
                    onChange: onChange,
                    is_nativepicker: is_nativepicker,
                    footer: (0, _localize.localize)('The minimum duration is 1 day')
                }) : _react2.default.createElement(_input_field2.default, {
                    type: 'number',
                    name: 'duration',
                    value: duration,
                    onChange: onChange,
                    is_nativepicker: is_nativepicker
                }),
                _react2.default.createElement(_dropdown2.default, {
                    list: duration_units_list,
                    value: duration_unit,
                    name: 'duration_unit',
                    onChange: onChange,
                    is_nativepicker: is_nativepicker
                })
            )
        ) : _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(_date_picker2.default, {
                name: 'expiry_date',
                showTodayBtn: true,
                minDate: min_date_expiry,
                onChange: onChange,
                is_nativepicker: is_nativepicker
            }),
            _react2.default.createElement(_time_picker2.default, {
                onChange: onChange,
                name: 'expiry_time',
                value: expiry_time,
                placeholder: '12:00 pm',
                is_nativepicker: is_nativepicker
            })
        )
    );
};

Duration.propTypes = {
    duration: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    duration_unit: _propTypes2.default.string,
    duration_units_list: _propTypes2.default.array,
    expiry_date: _propTypes2.default.string,
    expiry_time: _propTypes2.default.string,
    expiry_type: _propTypes2.default.string,
    is_minimized: _propTypes2.default.bool,
    is_nativepicker: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    server_time: _propTypes2.default.object
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        expiry_type: trade.expiry_type,
        expiry_date: trade.expiry_date,
        expiry_time: trade.expiry_time,
        duration: trade.duration,
        duration_unit: trade.duration_unit,
        duration_units_list: trade.duration_units_list,
        server_time: trade.server_time,
        onChange: trade.handleChange
    };
})(Duration);

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fullscreen_dialog = __webpack_require__(215);

var _fullscreen_dialog2 = _interopRequireDefault(_fullscreen_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractsPopUp = function (_React$PureComponent) {
    _inherits(ContractsPopUp, _React$PureComponent);

    function ContractsPopUp(props) {
        _classCallCheck(this, ContractsPopUp);

        var _this = _possibleConstructorReturn(this, (ContractsPopUp.__proto__ || Object.getPrototypeOf(ContractsPopUp)).call(this, props));

        _this.handleVisibility = _this.handleVisibility.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        _this.state = {
            is_list_visible: false
        };
        return _this;
    }

    _createClass(ContractsPopUp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(item) {
            if (item.value !== this.props.value) {
                this.props.onChange({ target: { name: this.props.name, value: item.value } });
            }
            this.handleVisibility();
        }
    }, {
        key: 'setWrapperRef',
        value: function setWrapperRef(node) {
            this.wrapper_ref = node;
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(event) {
            if (this.wrapper_ref && !this.wrapper_ref.contains(event.target) && this.state.is_list_visible) {
                this.setState({ is_list_visible: false });
            }
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({ is_list_visible: !this.state.is_list_visible });
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var _this2 = this;

            return Object.keys(this.props.list).map(function (key) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    { key: key },
                    _react2.default.createElement(Contracts, {
                        contracts: _this2.props.list[key],
                        name: _this2.props.name,
                        value: _this2.props.value,
                        handleSelect: _this2.handleSelect
                    })
                );
            });
        }
    }, {
        key: 'renderPopupList',
        value: function renderPopupList() {
            return _react2.default.createElement(
                'div',
                { className: 'contracts-popup-list' },
                _react2.default.createElement(
                    'div',
                    { className: 'list-container' },
                    this.renderList()
                )
            );
        }
    }, {
        key: 'renderModal',
        value: function renderModal() {
            return _react2.default.createElement(
                _fullscreen_dialog2.default,
                {
                    title: 'Select Trading Type',
                    visible: this.state.is_list_visible,
                    onClose: this.handleVisibility
                },
                _react2.default.createElement(
                    'div',
                    { className: 'contracts-modal-list' },
                    this.renderList()
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var container_classes = ['contracts-popup-container'];
            if (this.props.className) container_classes.push(this.props.className);
            if (this.state.is_list_visible) container_classes.push('show');

            var getDisplayText = function getDisplayText(list, value) {
                var findInArray = function findInArray(arr_list) {
                    return (arr_list.find(function (item) {
                        return item.value === value;
                    }) || {}).text;
                };
                var text = '';
                if (!Array.isArray(list)) {
                    Object.keys(list).some(function (key) {
                        text = findInArray(list[key]);
                        return text;
                    });
                }
                return text;
            };
            return _react2.default.createElement(
                'div',
                {
                    ref: this.setWrapperRef,
                    className: container_classes.join(' ')
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'contracts-popup-display ' + (this.state.is_list_visible ? 'clicked' : ''),
                        onClick: this.handleVisibility,
                        onBlur: this.handleVisibility
                    },
                    _react2.default.createElement('i', { className: 'contract-icon ic-' + this.props.value }),
                    _react2.default.createElement(
                        'span',
                        { name: this.props.name, value: this.props.value },
                        getDisplayText(this.props.list, this.props.value)
                    )
                ),
                !this.props.is_mobile_widget && _react2.default.createElement('span', { className: 'select-arrow' }),
                this.props.is_mobile_widget ? this.renderModal() : this.renderPopupList()
            );
        }
    }]);

    return ContractsPopUp;
}(_react2.default.PureComponent);

var Contracts = function Contracts(_ref) {
    var contracts = _ref.contracts,
        name = _ref.name,
        value = _ref.value,
        handleSelect = _ref.handleSelect;
    return contracts.map(function (contract, idx) {
        return _react2.default.createElement(
            'div',
            {
                key: idx,
                className: 'list-item ' + (value === contract.value ? 'selected' : ''),
                name: name,
                value: contract.value,
                onClick: handleSelect.bind(null, contract)
            },
            _react2.default.createElement('i', { className: 'contract-icon ic-' + contract.value + (value === contract.value ? '' : '--invert') }),
            _react2.default.createElement(
                'span',
                { className: 'contract-title' },
                contract.text
            )
        );
    });
};

ContractsPopUp.propTypes = {
    className: _propTypes2.default.string,
    is_mobile_widget: _propTypes2.default.bool,
    list: _propTypes2.default.object,
    name: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    value: _propTypes2.default.string
};

exports.default = ContractsPopUp;

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fullscreen_dialog = __webpack_require__(215);

var _fullscreen_dialog2 = _interopRequireDefault(_fullscreen_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileWidget = function (_React$PureComponent) {
    _inherits(MobileWidget, _React$PureComponent);

    function MobileWidget(props) {
        _classCallCheck(this, MobileWidget);

        var _this = _possibleConstructorReturn(this, (MobileWidget.__proto__ || Object.getPrototypeOf(MobileWidget)).call(this, props));

        _this.state = {
            open: false
        };
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleWidgetClick = _this.handleWidgetClick.bind(_this);
        return _this;
    }

    _createClass(MobileWidget, [{
        key: 'handleWidgetClick',
        value: function handleWidgetClick() {
            this.setState({
                open: true
            });
        }
    }, {
        key: 'handleDialogClose',
        value: function handleDialogClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var minimized_param_values = _react2.default.Children.map(this.props.children, function (child) {
                return _react2.default.cloneElement(child, {
                    is_minimized: true
                });
            });

            var param_pickers = _react2.default.Children.map(this.props.children, function (child) {
                return _react2.default.cloneElement(child, {
                    is_nativepicker: true
                });
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'mobile-widget', onClick: this.handleWidgetClick },
                    minimized_param_values
                ),
                _react2.default.createElement(
                    _fullscreen_dialog2.default,
                    {
                        title: 'Set parameters',
                        visible: this.state.open,
                        onClose: this.handleDialogClose
                    },
                    param_pickers
                )
            );
        }
    }]);

    return MobileWidget;
}(_react2.default.PureComponent);

MobileWidget.propTypes = {
    children: _propTypes2.default.array
};

exports.default = MobileWidget;

/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dropdown = __webpack_require__(116);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(101);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _connect = __webpack_require__(33);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var last_digit_numbers = [].concat(_toConsumableArray(Array(10).keys())).map(function (number) {
    return {
        text: number,
        value: number
    };
});

var LastDigit = function LastDigit(_ref) {
    var last_digit = _ref.last_digit,
        onChange = _ref.onChange,
        is_nativepicker = _ref.is_nativepicker,
        is_minimized = _ref.is_minimized;

    if (is_minimized) {
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized' },
            _react2.default.createElement('span', { className: 'icon digits' }),
            (0, _localize.localize)('Last Digit') + ': ' + last_digit
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            header: (0, _localize.localize)('Last Digit Prediction'),
            icon: 'digits',
            tooltip: (0, _localize.localize)('Text for Last Digits goes here.')
        },
        _react2.default.createElement(_dropdown2.default, {
            list: last_digit_numbers,
            value: last_digit,
            name: 'last_digit',
            onChange: onChange,
            is_nativepicker: is_nativepicker
        })
    );
};

LastDigit.propTypes = {
    is_minimized: _propTypes2.default.bool,
    is_nativepicker: _propTypes2.default.bool,
    last_digit: _propTypes2.default.number,
    onChange: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        last_digit: trade.last_digit,
        onChange: trade.handleChange
    };
})(LastDigit);

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = __webpack_require__(210);

var _button2 = _interopRequireDefault(_button);

var _connect = __webpack_require__(33);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Purchase = function Purchase(_ref) {
    var trade_types = _ref.trade_types;
    return _react2.default.createElement(
        'fieldset',
        null,
        Object.keys(trade_types).map(function (type, idx) {
            return _react2.default.createElement(_button2.default, {
                key: idx,
                id: 'purchase_' + type,
                className: 'primary green',
                has_effect: true,
                text: (0, _localize.localize)('Purchase') + ' ' + trade_types[type]
            });
        })
    );
};

Purchase.propTypes = {
    trade_types: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object])
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        trade_types: trade.trade_types
    };
})(Purchase);

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dropdown = __webpack_require__(116);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(101);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _time_picker = __webpack_require__(212);

var _time_picker2 = _interopRequireDefault(_time_picker);

var _connect = __webpack_require__(33);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartDate = function StartDate(_ref) {
    var start_date = _ref.start_date,
        start_dates_list = _ref.start_dates_list,
        start_time = _ref.start_time,
        server_time = _ref.server_time,
        onChange = _ref.onChange,
        is_nativepicker = _ref.is_nativepicker,
        is_minimized = _ref.is_minimized;

    if (is_minimized) {
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized start-date' },
            _react2.default.createElement('span', { className: 'icon start-time' }),
            start_date === 'now' ? (0, _localize.localize)('Now') : (start_dates_list.find(function (o) {
                return o.value === +start_date;
            }) || {}).text + '\n' + start_time
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            time: server_time,
            header: (0, _localize.localize)('Start time'),
            icon: 'start-time',
            tooltip: (0, _localize.localize)('Text for Start Time goes here.')
        },
        _react2.default.createElement(_dropdown2.default, {
            name: 'start_date',
            value: start_date,
            list: start_dates_list,
            onChange: onChange,
            type: 'date',
            is_nativepicker: is_nativepicker
        }),
        start_date !== 'now' && _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(_time_picker2.default, {
                onChange: onChange,
                name: 'start_time',
                value: start_time,
                placeholder: '12:00 pm',
                is_nativepicker: is_nativepicker
            })
        )
    );
};

StartDate.propTypes = {
    is_minimized: _propTypes2.default.bool,
    is_nativepicker: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    server_time: _propTypes2.default.object,
    start_date: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    start_dates_list: _propTypes2.default.array,
    start_time: _propTypes2.default.string
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        start_date: trade.start_date,
        start_dates_list: trade.start_dates_list,
        start_time: trade.start_time,
        server_time: trade.server_time,
        onChange: trade.handleChange
    };
})(StartDate);

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _connect = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Symbol = function _Symbol(_ref) {
    var symbol = _ref.symbol,
        symbols_list = _ref.symbols_list,
        onChange = _ref.onChange;
    return _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
            'select',
            { name: 'symbol', value: symbol, onChange: onChange },
            Object.keys(symbols_list).map(function (s) {
                return _react2.default.createElement(
                    'option',
                    { key: s, value: s },
                    symbols_list[s]
                );
            }),
            ';'
        )
    );
};

_Symbol.propTypes = {
    onChange: _propTypes2.default.func,
    symbol: _propTypes2.default.string,
    symbols_list: _propTypes2.default.object
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        symbol: trade.symbol,
        symbols_list: trade.symbols_list,
        onChange: trade.handleChange
    };
})(_Symbol);

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _connect = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test(_ref) {
    var entries = _ref.entries,
        json = _ref.json;
    return _react2.default.createElement(
        'div',
        { style: { fontSize: '10px', lineHeight: '15px' } },
        entries.map(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                k = _ref3[0],
                v = _ref3[1];

            return _react2.default.createElement(
                'div',
                { key: k },
                _react2.default.createElement(
                    'strong',
                    null,
                    k,
                    ':'
                ),
                ' ',
                v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? JSON.stringify(v) : v
            );
        }),
        _react2.default.createElement('br', null),
        json
    );
};

Test.propTypes = {
    entries: _propTypes2.default.array,
    json: _propTypes2.default.string
};

exports.default = (0, _connect.connect)(function (_ref4) {
    var trade = _ref4.trade;
    return {
        entries: Object.entries(trade),
        json: JSON.stringify(trade).replace(/(:|,)/g, '$1 ')
    };
})(Test);

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _amount = __webpack_require__(392);

var _amount2 = _interopRequireDefault(_amount);

var _barrier = __webpack_require__(393);

var _barrier2 = _interopRequireDefault(_barrier);

var _contract_type = __webpack_require__(394);

var _contract_type2 = _interopRequireDefault(_contract_type);

var _duration = __webpack_require__(395);

var _duration2 = _interopRequireDefault(_duration);

var _last_digit = __webpack_require__(398);

var _last_digit2 = _interopRequireDefault(_last_digit);

var _purchase = __webpack_require__(399);

var _purchase2 = _interopRequireDefault(_purchase);

var _start_date = __webpack_require__(400);

var _start_date2 = _interopRequireDefault(_start_date);

var _symbol = __webpack_require__(401);

var _symbol2 = _interopRequireDefault(_symbol);

var _test = __webpack_require__(402);

var _test2 = _interopRequireDefault(_test);

var _mobile_widget = __webpack_require__(397);

var _mobile_widget2 = _interopRequireDefault(_mobile_widget);

var _portfolio_drawer = __webpack_require__(379);

var _portfolio_drawer2 = _interopRequireDefault(_portfolio_drawer);

var _connect = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var form_components = [{
    name: 'start_date',
    Component: _start_date2.default
}, {
    name: 'duration',
    Component: _duration2.default
}, {
    name: 'barrier',
    Component: _barrier2.default
}, {
    name: 'last_digit',
    Component: _last_digit2.default
}, {
    name: 'amount',
    Component: _amount2.default
}];

var TradeApp = function (_React$Component) {
    _inherits(TradeApp, _React$Component);

    function TradeApp() {
        _classCallCheck(this, TradeApp);

        return _possibleConstructorReturn(this, (TradeApp.__proto__ || Object.getPrototypeOf(TradeApp)).apply(this, arguments));
    }

    _createClass(TradeApp, [{
        key: 'isVisible',
        value: function isVisible(component_name) {
            return this.props.form_components.includes(component_name);
        }
    }, {
        key: 'renderParamPickers',
        value: function renderParamPickers() {
            var _this2 = this;

            return form_components.filter(function (_ref) {
                var name = _ref.name;
                return _this2.isVisible(name);
            }).map(function (_ref2) {
                var name = _ref2.name,
                    Component = _ref2.Component;
                return _react2.default.createElement(Component, { key: name });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'trade_container', className: this.props.is_portfolio_drawer_on ? 'show' : undefined },
                _react2.default.createElement(
                    'div',
                    { className: 'chart-container notice-msg' },
                    _react2.default.createElement(_symbol2.default, null),
                    _react2.default.createElement(_contract_type2.default, { className: 'desktop-only' }),
                    _react2.default.createElement(_contract_type2.default, { className: 'mobile-only', is_mobile_widget: true }),
                    _react2.default.createElement(_test2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'sidebar-container desktop-only' },
                    this.renderParamPickers(),
                    _react2.default.createElement(_purchase2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'mobile-only' },
                    _react2.default.createElement(
                        _mobile_widget2.default,
                        null,
                        this.renderParamPickers()
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'offset-container' },
                    _react2.default.createElement(_portfolio_drawer2.default, {
                        onClick: this.props.togglePortfolioDrawer,
                        portfolios: this.props.portfolios,
                        server_time: this.props.server_time
                    })
                )
            );
        }
    }]);

    return TradeApp;
}(_react2.default.Component);

TradeApp.propTypes = {
    form_components: _propTypes2.default.array,
    is_portfolio_drawer_on: _propTypes2.default.bool,
    portfolios: _propTypes2.default.array,
    server_time: _propTypes2.default.object,
    togglePortfolioDrawer: _propTypes2.default.func
};

exports.default = (0, _connect.connect)(function (_ref3) {
    var trade = _ref3.trade,
        ui = _ref3.ui;
    return {
        form_components: trade.form_components,
        portfolios: trade.portfolios,
        server_time: trade.server_time,
        is_portfolio_drawer_on: ui.is_portfolio_drawer_on,
        togglePortfolioDrawer: ui.togglePortfolioDrawer
    };
})(TradeApp);

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(68);

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var ClientStore = (_class = function ClientStore() {
    _classCallCheck(this, ClientStore);

    _initDefineProp(this, 'balance', _descriptor, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'balance', [_mobx.observable], {
    enumerable: true,
    initializer: null
})), _class);
exports.default = ClientStore;
;

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28;

var _mobx = __webpack_require__(68);

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _contract_type = __webpack_require__(102);

var _contract_type2 = _interopRequireDefault(_contract_type);

var _index = __webpack_require__(213);

var _index2 = _interopRequireDefault(_index);

var _client_base = __webpack_require__(24);

var _client_base2 = _interopRequireDefault(_client_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var TradeStore = (_dec = _mobx.action.bound, _dec2 = _mobx.action.bound, _dec3 = _mobx.action.bound, (_class = function () {
    function TradeStore() {
        _classCallCheck(this, TradeStore);

        this.time_interval = undefined;

        _initDefineProp(this, 'symbols_list', _descriptor, this);

        _initDefineProp(this, 'symbol', _descriptor2, this);

        _initDefineProp(this, 'contract_type', _descriptor3, this);

        _initDefineProp(this, 'contract_types_list', _descriptor4, this);

        _initDefineProp(this, 'trade_types', _descriptor5, this);

        _initDefineProp(this, 'contract_start_type', _descriptor6, this);

        _initDefineProp(this, 'contract_expiry_type', _descriptor7, this);

        _initDefineProp(this, 'form_components', _descriptor8, this);

        _initDefineProp(this, 'basis', _descriptor9, this);

        _initDefineProp(this, 'currency', _descriptor10, this);

        _initDefineProp(this, 'currencies_list', _descriptor11, this);

        _initDefineProp(this, 'amount', _descriptor12, this);

        _initDefineProp(this, 'expiry_type', _descriptor13, this);

        _initDefineProp(this, 'duration', _descriptor14, this);

        _initDefineProp(this, 'duration_unit', _descriptor15, this);

        _initDefineProp(this, 'duration_units_list', _descriptor16, this);

        _initDefineProp(this, 'expiry_date', _descriptor17, this);

        _initDefineProp(this, 'expiry_time', _descriptor18, this);

        _initDefineProp(this, 'barrier_1', _descriptor19, this);

        _initDefineProp(this, 'barrier_2', _descriptor20, this);

        _initDefineProp(this, 'start_dates_list', _descriptor21, this);

        _initDefineProp(this, 'start_date', _descriptor22, this);

        _initDefineProp(this, 'start_time', _descriptor23, this);

        _initDefineProp(this, 'last_digit', _descriptor24, this);

        _initDefineProp(this, 'message', _descriptor25, this);

        _initDefineProp(this, 'tick', _descriptor26, this);

        _initDefineProp(this, 'server_time', _descriptor27, this);

        _initDefineProp(this, 'portfolios', _descriptor28, this);
    }

    _createClass(TradeStore, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.time_interval = setInterval(_index2.default.initTime, 1000);
            _index2.default.getCountryAsync();

            _index2.default.getTicks((0, _mobx.action)('getTicks', function (r) {
                _this.tick = r;
            }));

            if (!_client_base2.default.get('currency')) {
                _index2.default.getCurrenciesAsync();
            }
            _contract_type2.default.buildContractTypesConfig(this.symbol).then((0, _mobx.action)(function () {
                _this.contract_types_list = _contract_type2.default.getContractCategories();
            }));
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            clearInterval(this.time_interval);
            this.time_interval = undefined;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _e$target = e.target,
                name = _e$target.name,
                value = _e$target.value;

            if (!(name in this)) {
                throw new Error('Invalid Argument: ' + name);
            }
            this[name] = value;
        }

        // Underlying


        // Contract Type


        // Amount


        // Duration


        // Barrier


        // Start Time


        // Last Digit


        // Test


        // TODO: retrieve from upper state


        // TODO: to remove dummy portfolio value

    }]);

    return TradeStore;
}(), (_applyDecoratedDescriptor(_class.prototype, 'init', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dispose', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'dispose'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleChange', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'handleChange'), _class.prototype), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'symbols_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return { frxAUDJPY: 'AUD/JPY', AS51: 'Australian Index', HSI: 'Hong Kong Index', DEAIR: 'Airbus', frxXAUUSD: 'Gold/USD', R_10: 'Volatility 10 Index' };
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'symbol', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return Object.keys(this.symbols_list)[0];
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'contract_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'contract_types_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return {};
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'trade_types', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'contract_start_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'contract_expiry_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'form_components', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'basis', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 'stake';
    }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'currency', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return _client_base2.default.get('currency');
    }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'currencies_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return {};
    }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'amount', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 5;
    }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'expiry_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 'duration';
    }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'duration', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 15;
    }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'duration_unit', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'duration_units_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'expiry_date', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, 'expiry_time', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '09:40 pm';
    }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'barrier_1', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 0;
    }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, 'barrier_2', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 0;
    }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, 'start_dates_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, 'start_date', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 'now';
    }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, 'start_time', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '12:30 am';
    }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, 'last_digit', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 3;
    }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, 'message', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, 'tick', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, 'server_time', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return _moment2.default.utc();
    }
}), _descriptor28 = _applyDecoratedDescriptor(_class.prototype, 'portfolios', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [{
            transaction_id: 32355620467,
            contract_id: 478981052055,
            payout: 10,
            expiry_time: 1522886399,
            longcode: 'Win payout if AUD/JPY is strictly higher than entry spot at close on 2018-04-04.',
            shortcode: 'CALL_FRXAUDJPY_10_1520263325_1522886399_S0P_0',
            currency: 'USD',
            buy_price: 1.06,
            app_id: 1,
            symbol: 'AUD/JPY'
        }, {
            transaction_id: 47272620508,
            contract_id: 432523746528,
            payout: 10,
            expiry_time: 15234686345,
            longcode: 'Win payout if AUD/JPY is strictly higher than entry spot at close on 2018-05-04.',
            shortcode: 'CALL_FRXAUDJPY_10_1520263325_1522886399_S0P_0',
            currency: 'USD',
            buy_price: -55.25,
            app_id: 1,
            symbol: 'Australian Index'
        }];
    }
})), _class));
exports.default = TradeStore;
;

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(68);

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var UIStore = (_dec = _mobx.action.bound, (_class = function () {
    function UIStore() {
        _classCallCheck(this, UIStore);

        _initDefineProp(this, 'is_portfolio_drawer_on', _descriptor, this);
    }

    _createClass(UIStore, [{
        key: 'togglePortfolioDrawer',
        value: function togglePortfolioDrawer() {
            // toggle show and hide Portfolio Drawer
            this.is_portfolio_drawer_on = !this.is_portfolio_drawer_on;
        }
    }]);

    return UIStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'is_portfolio_drawer_on', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return false;
    }
}), _applyDecoratedDescriptor(_class.prototype, 'togglePortfolioDrawer', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'togglePortfolioDrawer'), _class.prototype)), _class));
exports.default = UIStore;
;

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
    var theme = _ref.theme;
    return _react2.default.createElement(
        'div',
        { className: 'barspinner ' + (theme || 'dark') },
        Array.from(new Array(5)).map(function (x, inx) {
            return _react2.default.createElement('div', { key: inx, className: 'rect' + (inx + 1) });
        })
    );
};

exports.default = Loading;

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(7);
var LocalStore = __webpack_require__(5).LocalStore;
var getPropertyValue = __webpack_require__(1).getPropertyValue;
var getStaticHash = __webpack_require__(1).getStaticHash;
var isEmptyObject = __webpack_require__(1).isEmptyObject;

/*
 * Caches WS responses to reduce delay time and number of requests
 * Stores data in LocalStore which is the first one available in: localStorage, sessionStorage, InScriptStore
 *
 * 1. It caches only the response of those calls which determined in `config`
 * 2. It doesn't cache responses which returned error
 * 3. The value is requested by BinarySocket,
 *    if this returns a value according to the logic here, socket code take it as response
 *    but also triggers an async `send` request, to keep the cache updated for next time
 * 4. Uses client's time to set and check for expiry, as the expire durations are not so long to need a more precise one
 *    (And doesn't worth to wait for the response of time call)
 * 5. Some responses should be cached by a particular value from request (e.g. contracts_for_frxAUDJPY)
 *    so there can be more than one value for a particular call
 * 6. Clears the whole cache regardless their expire time on the following events:
 *    6.1. Client changes: login / logout / switch loginid
 *    6.2. Detect a new release (static hash changed)
 */
var SocketCache = function () {
    // keys are msg_type
    // expire: how long to keep the value (in minutes)
    // map_to: if presents, stores the response based on the value of the provided key in the echo_req
    var config = {
        payout_currencies: { expire: 10 },
        active_symbols: { expire: 10, map_to: ['product_type', 'landing_company'] },
        contracts_for: { expire: 10, map_to: ['contracts_for', 'product_type', 'currency'] },
        exchange_rates: { expire: 60, map_to: ['base_currency'] }
    };

    var storage_key = 'ws_cache';

    var data_obj = {};

    var set = function set(response) {
        var msg_type = response.msg_type;

        if (!config[msg_type]) return;

        // prevent unwanted page behaviour
        // if a cached version already exists but it gives an error after being called for updating the cache
        if ((response.error || !response[msg_type]) && get(response.echo_req)) {
            clear();
            window.location.reload();
            return;
        }

        var key = makeKey(response.echo_req, msg_type);
        var expires = moment().add(config[msg_type].expire, 'm').valueOf();

        if (!data_obj.static_hash) {
            data_obj.static_hash = getStaticHash();
        }

        data_obj[key] = { value: response, expires: expires };
        LocalStore.setObject(storage_key, data_obj);
    };

    var get = function get(request, msg_type) {
        var response = void 0;

        if (isEmptyObject(data_obj)) {
            data_obj = LocalStore.getObject(storage_key);
            if (isEmptyObject(data_obj)) return undefined;
        }

        if (data_obj.static_hash !== getStaticHash()) {
            // new release
            clear();
        }

        var key = makeKey(request, msg_type);
        var response_obj = getPropertyValue(data_obj, key) || {};

        if (moment().isBefore(response_obj.expires)) {
            response = response_obj.value;
        } else {
            // remove if expired
            remove(key);
        }

        return response;
    };

    var makeKey = function makeKey(source_obj, msg_type) {
        var key = msg_type || Object.keys(source_obj).find(function (type) {
            return config[type];
        });

        if (key && !isEmptyObject(source_obj)) {
            ((config[key] || {}).map_to || []).forEach(function (map_key) {
                key += map_key ? '_' + (source_obj[map_key] || '') : '';
            });
        }

        return key;
    };

    var remove = function remove(key, should_match_all) {
        if (should_match_all) {
            Object.keys(data_obj).forEach(function (data_key) {
                if (data_key.indexOf(key) !== -1) {
                    delete data_obj[data_key];
                }
            });
        } else if (key in data_obj) {
            delete data_obj[key];
        }
        LocalStore.setObject(storage_key, data_obj);
    };

    var clear = function clear() {
        LocalStore.remove(storage_key);
        data_obj = {};
    };

    return {
        set: set,
        get: get,
        remove: remove,
        clear: clear
    };
}();

module.exports = SocketCache;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cookies = __webpack_require__(44);
var getPropertyValue = __webpack_require__(1).getPropertyValue;
var isEmptyObject = __webpack_require__(1).isEmptyObject;

var getObject = function getObject(key) {
    return JSON.parse(this.getItem(key) || '{}');
};

var setObject = function setObject(key, value) {
    if (value && value instanceof Object) {
        this.setItem(key, JSON.stringify(value));
    }
};

if (typeof Storage !== 'undefined') {
    Storage.prototype.getObject = getObject;
    Storage.prototype.setObject = setObject;
}

var isStorageSupported = function isStorageSupported(storage) {
    if (typeof storage === 'undefined') {
        return false;
    }

    var test_key = 'test';
    try {
        storage.setItem(test_key, '1');
        storage.removeItem(test_key);
        return true;
    } catch (e) {
        return false;
    }
};

var Store = function Store(storage) {
    this.storage = storage;
    this.storage.getObject = getObject;
    this.storage.setObject = setObject;
};

Store.prototype = {
    get: function get(key) {
        return this.storage.getItem(key) || undefined;
    },
    set: function set(key, value) {
        if (typeof value !== 'undefined') {
            this.storage.setItem(key, value);
        }
    },
    getObject: function getObject(key) {
        return typeof this.storage.getObject === 'function' ? // Prevent runtime error in IE
        this.storage.getObject(key) : JSON.parse(this.storage.getItem(key) || '{}');
    },
    setObject: function setObject(key, value) {
        if (typeof this.storage.setObject === 'function') {
            // Prevent runtime error in IE
            this.storage.setObject(key, value);
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
    },
    remove: function remove(key) {
        this.storage.removeItem(key);
    },
    clear: function clear() {
        this.storage.clear();
    }
};

var InScriptStore = function InScriptStore(object) {
    this.store = typeof object !== 'undefined' ? object : {};
};

InScriptStore.prototype = {
    get: function get(key) {
        return getPropertyValue(this.store, key);
    },
    set: function set(k, value) {
        var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.store;

        var key = k;
        if (!Array.isArray(key)) key = [key];
        if (key.length > 1) {
            if (!(key[0] in obj) || isEmptyObject(obj[key[0]])) obj[key[0]] = {};
            this.set(key.slice(1), value, obj[key[0]]);
        } else {
            obj[key[0]] = value;
        }
    },
    getObject: function getObject(key) {
        return JSON.parse(this.get(key) || '{}');
    },
    setObject: function setObject(key, value) {
        this.set(key, JSON.stringify(value));
    },
    remove: function remove() {
        var _this = this;

        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
        }

        keys.forEach(function (key) {
            delete _this.store[key];
        });
    },
    clear: function clear() {
        this.store = {};
    },
    has: function has(key) {
        return this.get(key) !== undefined;
    },
    keys: function keys() {
        return Object.keys(this.store);
    },
    call: function call(key) {
        if (typeof this.get(key) === 'function') this.get(key)();
    }
};

var State = new InScriptStore();
State.prototype = InScriptStore.prototype;
/**
 * Shorthand function to get values from response object of State
 *
 * @param {String} pathname
 *     e.g. getResponse('authorize.currency') == get(['response', 'authorize', 'authorize', 'currency'])
 */
State.prototype.getResponse = function (pathname) {
    var path = pathname;
    if (typeof path === 'string') {
        var _keys = path.split('.');
        path = ['response', _keys[0]].concat(_keys);
    }
    return this.get(path);
};
State.set('response', {});

var CookieStorage = function CookieStorage(cookie_name, cookie_domain) {
    var hostname = window.location.hostname;

    this.initialized = false;
    this.cookie_name = cookie_name;
    this.domain = cookie_domain || (/\.binary\.com/i.test(hostname) ? '.' + hostname.split('.').slice(-2).join('.') : hostname);
    this.path = '/';
    this.expires = new Date('Thu, 1 Jan 2037 12:00:00 GMT');
    this.value = {};
};

CookieStorage.prototype = {
    read: function read() {
        var cookie_value = Cookies.get(this.cookie_name);
        try {
            this.value = cookie_value ? JSON.parse(cookie_value) : {};
        } catch (e) {
            this.value = {};
        }
        this.initialized = true;
    },
    write: function write(val, expireDate, isSecure) {
        if (!this.initialized) this.read();
        this.value = val;
        if (expireDate) this.expires = expireDate;
        Cookies.set(this.cookie_name, this.value, {
            expires: this.expires,
            path: this.path,
            domain: this.domain,
            secure: !!isSecure
        });
    },
    get: function get(key) {
        if (!this.initialized) this.read();
        return this.value[key];
    },
    set: function set(key, val) {
        if (!this.initialized) this.read();
        this.value[key] = val;
        Cookies.set(this.cookie_name, this.value, {
            expires: new Date(this.expires),
            path: this.path,
            domain: this.domain
        });
    },
    remove: function remove() {
        Cookies.remove(this.cookie_name, {
            path: this.path,
            domain: this.domain
        });
    }
};

var removeCookies = function removeCookies() {
    for (var _len2 = arguments.length, cookie_names = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        cookie_names[_key2] = arguments[_key2];
    }

    var domains = ['.' + document.domain.split('.').slice(-2).join('.'), '.' + document.domain];

    var parent_path = window.location.pathname.split('/', 2)[1];
    if (parent_path !== '') {
        parent_path = '/' + parent_path;
    }

    cookie_names.forEach(function (c) {
        Cookies.remove(c, { path: '/', domain: domains[0] });
        Cookies.remove(c, { path: '/', domain: domains[1] });
        Cookies.remove(c);
        if (new RegExp(c).test(document.cookie) && parent_path) {
            Cookies.remove(c, { path: parent_path, domain: domains[0] });
            Cookies.remove(c, { path: parent_path, domain: domains[1] });
            Cookies.remove(c, { path: parent_path });
        }
    });
};

var SessionStore = void 0,
    LocalStore = void 0;

if (isStorageSupported(window.localStorage)) {
    LocalStore = new Store(window.localStorage);
}
if (isStorageSupported(window.sessionStorage)) {
    SessionStore = new Store(window.sessionStorage);
}

if (!LocalStore) {
    LocalStore = new InScriptStore();
}
if (!SessionStore) {
    SessionStore = new InScriptStore();
}

module.exports = {
    isStorageSupported: isStorageSupported,
    CookieStorage: CookieStorage,
    removeCookies: removeCookies,
    State: State,
    SessionStore: SessionStore,
    LocalStore: LocalStore
};

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getLanguage = __webpack_require__(15).get;
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(5).State;
var getPropertyValue = __webpack_require__(1).getPropertyValue;

var currencies_config = {};

var formatMoney = function formatMoney(currency_value, amount, exclude_currency) {
    var decimals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var minimumFractionDigits = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var money = amount;
    if (money) money = String(money).replace(/,/g, '');
    var sign = money && Number(money) < 0 ? '-' : '';
    var decimal_places = decimals || getDecimalPlaces(currency_value);

    money = isNaN(money) ? 0 : Math.abs(money);
    if (typeof Intl !== 'undefined') {
        var options = {
            minimumFractionDigits: minimumFractionDigits || decimal_places,
            maximumFractionDigits: decimal_places
        };
        money = new Intl.NumberFormat(getLanguage().toLowerCase().replace('_', '-'), options).format(money);
    } else {
        money = addComma(money, decimal_places);
    }

    return sign + (exclude_currency ? '' : formatCurrency(currency_value)) + money;
};

var formatCurrency = function formatCurrency(currency) {
    return '<span class="symbols ' + (currency || '').toLowerCase() + '"></span>';
}; // defined in binary-style

var addComma = function addComma(num, decimal_points, is_crypto) {
    var number = String(num || 0).replace(/,/g, '');
    if (typeof decimal_points !== 'undefined') {
        number = (+number).toFixed(decimal_points);
    }
    if (is_crypto) {
        number = parseFloat(+number);
    }

    return number.toString().replace(/(^|[^\w.])(\d{4,})/g, function ($0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, '$&,');
    });
};

var isJPClient = function isJPClient() {
    return !!State.get('is_jp_client');
};

var getFiatDecimalPlaces = function getFiatDecimalPlaces() {
    return isJPClient() ? 0 : 2;
};

var calcDecimalPlaces = function calcDecimalPlaces(currency) {
    return isCryptocurrency(currency) ? 8 : getFiatDecimalPlaces();
};

var getDecimalPlaces = function getDecimalPlaces(currency) {
    return (
        // need to check currencies_config[currency] exists instead of || in case of 0 value
        currencies_config[currency] ? getPropertyValue(currencies_config, [currency, 'fractional_digits']) : calcDecimalPlaces(currency)
    );
};

var setCurrencies = function setCurrencies(website_status) {
    currencies_config = website_status.currencies_config;
};

var isCryptocurrency = function isCryptocurrency(currency) {
    return (/crypto/i.test(getPropertyValue(currencies_config, [currency, 'type']))
    );
};

var crypto_config = {
    BTC: { name: 'Bitcoin', min_withdrawal: 0.002 },
    BCH: { name: 'Bitcoin Cash', min_withdrawal: 0.002 },
    ETH: { name: 'Ether', min_withdrawal: 0.002 },
    ETC: { name: 'Ether Classic', min_withdrawal: 0.002 },
    LTC: { name: 'Litecoin', min_withdrawal: 0.002 },
    DAI: { name: 'Dai', min_withdrawal: 0.002 }
};

var getMinWithdrawal = function getMinWithdrawal(currency) {
    return isCryptocurrency(currency) ? getPropertyValue(crypto_config, [currency, 'min_withdrawal']) || 0.002 : 1;
};

var getCurrencyName = function getCurrencyName(currency) {
    return localize(getPropertyValue(crypto_config, [currency, 'name']) || '');
};

var getFiatPayout = function getFiatPayout() {
    return isJPClient() ? 1 : 10;
};

var getMinPayout = function getMinPayout(currency) {
    return isCryptocurrency(currency) ? getPropertyValue(currencies_config, [currency, 'stake_default']) : getFiatPayout();
};

module.exports = {
    formatMoney: formatMoney,
    formatCurrency: formatCurrency,
    addComma: addComma,
    getDecimalPlaces: getDecimalPlaces,
    setCurrencies: setCurrencies,
    isCryptocurrency: isCryptocurrency,
    getCurrencyName: getCurrencyName,
    getMinWithdrawal: getMinWithdrawal,
    getMinPayout: getMinPayout,
    getCurrencies: function getCurrencies() {
        return currencies_config;
    }
};

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientBase = __webpack_require__(24);
var SocketCache = __webpack_require__(45);
var getLanguage = __webpack_require__(15).get;
var State = __webpack_require__(5).State;
var cloneObject = __webpack_require__(1).cloneObject;
var getPropertyValue = __webpack_require__(1).getPropertyValue;
var isEmptyObject = __webpack_require__(1).isEmptyObject;
var getAppId = __webpack_require__(34).getAppId;
var getSocketURL = __webpack_require__(34).getSocketURL;

/*
 * An abstraction layer over native javascript WebSocket,
 * which provides additional functionality like
 * reopen the closed connection and process the buffered requests
 */
var BinarySocketBase = function () {
    var binary_socket = void 0;

    var config = {};
    var buffered_sends = [];
    var req_id = 0;
    var wrong_app_id = 0;
    var is_available = true;
    var is_disconnect_called = false;

    var socket_url = getSocketURL() + '?app_id=' + getAppId() + '&l=' + getLanguage();
    var timeouts = {};
    var promises = {};

    var no_duplicate_requests = ['authorize', 'get_settings', 'residence_list', 'landing_company', 'payout_currencies', 'asset_index'];

    var sent_requests = {
        items: [],
        clear: function clear() {
            sent_requests.items = [];
        },
        has: function has(msg_type) {
            return sent_requests.items.indexOf(msg_type) >= 0;
        },
        add: function add(msg_type) {
            if (!sent_requests.has(msg_type)) sent_requests.items.push(msg_type);
        },
        remove: function remove(msg_type) {
            if (sent_requests.has(msg_type)) sent_requests.items.splice(sent_requests.items.indexOf(msg_type, 1));
        }
    };

    var waiting_list = {
        items: {},
        add: function add(msg_type, promise_obj) {
            if (!waiting_list.items[msg_type]) {
                waiting_list.items[msg_type] = [];
            }
            waiting_list.items[msg_type].push(promise_obj);
        },
        resolve: function resolve(response) {
            var msg_type = response.msg_type;
            var this_promises = waiting_list.items[msg_type];
            if (this_promises && this_promises.length) {
                this_promises.forEach(function (pr) {
                    if (!waiting_list.another_exists(pr, msg_type)) {
                        pr.resolve(response);
                    }
                });
                waiting_list.items[msg_type] = [];
            }
        },
        another_exists: function another_exists(pr, msg_type) {
            return Object.keys(waiting_list.items).some(function (type) {
                return type !== msg_type && waiting_list.items[type].indexOf(pr) !== -1;
            });
        }
    };

    var clearTimeouts = function clearTimeouts() {
        Object.keys(timeouts).forEach(function (key) {
            clearTimeout(timeouts[key]);
            delete timeouts[key];
        });
    };

    var isReady = function isReady() {
        return hasReadyState(1);
    };

    var isClose = function isClose() {
        return !binary_socket || hasReadyState(2, 3);
    };

    var hasReadyState = function hasReadyState() {
        for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
            states[_key] = arguments[_key];
        }

        return binary_socket && states.some(function (s) {
            return binary_socket.readyState === s;
        });
    };

    var sendBufferedRequests = function sendBufferedRequests() {
        while (buffered_sends.length > 0 && is_available) {
            var req_obj = buffered_sends.shift();
            send(req_obj.request, req_obj.options);
        }
    };

    var wait = function wait() {
        for (var _len2 = arguments.length, msg_types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            msg_types[_key2] = arguments[_key2];
        }

        var promise_obj = new PromiseClass();
        var is_resolved = true;
        msg_types.forEach(function (msg_type) {
            var last_response = State.get(['response', msg_type]);
            if (!last_response) {
                if (msg_type !== 'authorize' || ClientBase.isLoggedIn()) {
                    waiting_list.add(msg_type, promise_obj);
                    is_resolved = false;
                }
            } else if (msg_types.length === 1) {
                promise_obj.resolve(last_response);
            }
        });
        if (is_resolved) {
            promise_obj.resolve();
        }
        return promise_obj.promise;
    };

    /**
     * @param {Object} data: request object
     * @param {Object} options:
     *      forced  : {boolean}  sends the request regardless the same msg_type has been sent before
     *      msg_type: {string}   specify the type of request call
     *      callback: {function} to call on response of streaming requests
     */
    var send = function send(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var promise_obj = options.promise || new PromiseClass();

        if (!data || isEmptyObject(data)) return promise_obj.promise;

        var msg_type = options.msg_type || no_duplicate_requests.find(function (c) {
            return c in data;
        });

        // Fetch from cache
        if (!options.forced) {
            var response = SocketCache.get(data, msg_type);
            if (response) {
                State.set(['response', msg_type], cloneObject(response));
                if (isReady() && is_available) {
                    // make the request to keep the cache updated
                    binary_socket.send(JSON.stringify(data));
                }
                promise_obj.resolve(response);
                return promise_obj.promise;
            }
        }

        // Fetch from state
        if (!options.forced && msg_type && no_duplicate_requests.indexOf(msg_type) !== -1) {
            var last_response = State.get(['response', msg_type]);
            if (last_response) {
                promise_obj.resolve(last_response);
                return promise_obj.promise;
            } else if (sent_requests.has(msg_type)) {
                return wait(msg_type).then(function (response) {
                    promise_obj.resolve(response);
                    return promise_obj.promise;
                });
            }
        }

        if (!data.req_id) {
            data.req_id = ++req_id;
        }
        promises[data.req_id] = {
            callback: function callback(response) {
                if (typeof options.callback === 'function') {
                    options.callback(response);
                } else {
                    promise_obj.resolve(response);
                }
            },
            subscribe: !!data.subscribe
        };

        if (isReady() && is_available && config.isOnline()) {
            is_disconnect_called = false;
            if (!getPropertyValue(data, 'passthrough') && !getPropertyValue(data, 'verify_email')) {
                data.passthrough = {};
            }

            binary_socket.send(JSON.stringify(data));
            config.wsEvent('send');
            if (msg_type && !sent_requests.has(msg_type)) {
                sent_requests.add(msg_type);
            }
        } else if (+data.time !== 1) {
            // Do not buffer all time requests
            buffered_sends.push({ request: data, options: Object.assign(options, { promise: promise_obj }) });
        }

        return promise_obj.promise;
    };

    var init = function init(options) {
        if (wrong_app_id === getAppId()) {
            return;
        }
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && config !== options) {
            config = options;
            buffered_sends = [];
        }
        clearTimeouts();
        config.wsEvent('init');

        if (isClose()) {
            binary_socket = new WebSocket(socket_url);
            State.set('response', {});
        }

        binary_socket.onopen = function () {
            config.wsEvent('open');
            if (ClientBase.isLoggedIn()) {
                send({ authorize: ClientBase.get('token') }, { forced: true });
            } else {
                sendBufferedRequests();
            }

            if (typeof config.onOpen === 'function') {
                config.onOpen(isReady());
            }
        };

        binary_socket.onmessage = function (msg) {
            config.wsEvent('message');
            var response = msg.data ? JSON.parse(msg.data) : undefined;
            if (response) {
                SocketCache.set(response);
                var msg_type = response.msg_type;

                // store in State
                if (!getPropertyValue(response, ['echo_req', 'subscribe']) || /balance|website_status/.test(msg_type)) {
                    State.set(['response', msg_type], cloneObject(response));
                }
                // resolve the send promise
                var this_req_id = response.req_id;
                var pr = this_req_id ? promises[this_req_id] : null;
                if (pr && typeof pr.callback === 'function') {
                    pr.callback(response);
                    if (!pr.subscribe) {
                        delete promises[this_req_id];
                    }
                }
                // resolve the wait promise
                waiting_list.resolve(response);

                if (getPropertyValue(response, ['error', 'code']) === 'InvalidAppID') {
                    wrong_app_id = getAppId();
                }

                if (typeof config.onMessage === 'function') {
                    config.onMessage(response);
                }
            }
        };

        binary_socket.onclose = function () {
            sent_requests.clear();
            clearTimeouts();
            config.wsEvent('close');

            if (wrong_app_id !== getAppId() && typeof config.onDisconnect === 'function' && !is_disconnect_called) {
                config.onDisconnect();
                is_disconnect_called = true;
            }
        };
    };

    var clear = function clear(msg_type) {
        buffered_sends = [];
        if (msg_type) {
            State.set(['response', msg_type], undefined);
            sent_requests.remove(msg_type);
        }
    };

    var availability = function availability(status) {
        if (typeof status !== 'undefined') {
            is_available = !!status;
        }
        return is_available;
    };

    return {
        init: init,
        wait: wait,
        send: send,
        clear: clear,
        clearTimeouts: clearTimeouts,
        availability: availability,
        hasReadyState: hasReadyState,
        sendBuffered: sendBufferedRequests,
        get: function get() {
            return binary_socket;
        },
        setOnDisconnect: function setOnDisconnect(onDisconnect) {
            config.onDisconnect = onDisconnect;
        },
        removeOnDisconnect: function removeOnDisconnect() {
            delete config.onDisconnect;
        }
    };
}();

var PromiseClass = function PromiseClass() {
    var _this = this;

    _classCallCheck(this, PromiseClass);

    this.promise = new Promise(function (resolve, reject) {
        _this.reject = reject;
        _this.resolve = resolve;
    });
};

module.exports = BinarySocketBase;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Cookies = __webpack_require__(44);
var moment = __webpack_require__(7);
var ClientBase = __webpack_require__(24);
var Login = __webpack_require__(38);
var BinarySocket = __webpack_require__(53);
var getElementById = __webpack_require__(3).getElementById;
var isVisible = __webpack_require__(3).isVisible;
var getLanguage = __webpack_require__(15).get;
var State = __webpack_require__(5).State;
var getAppId = __webpack_require__(34).getAppId;

var GTM = function () {
    var isGtmApplicable = function isGtmApplicable() {
        return (/^(1|1098)$/.test(getAppId())
        );
    };

    var gtmDataLayerInfo = function gtmDataLayerInfo(data) {
        var data_layer_info = {
            language: getLanguage(),
            pageTitle: pageTitle(),
            pjax: State.get('is_loaded_by_pjax'),
            url: document.URL,
            event: 'page_load'
        };
        if (ClientBase.isLoggedIn()) {
            data_layer_info.visitorId = ClientBase.get('loginid');
        }

        Object.assign(true, data_layer_info, data);

        var event = data_layer_info.event;
        delete data_layer_info.event;

        return {
            event: event,
            data: data_layer_info
        };
    };

    var pushDataLayer = function pushDataLayer(data) {
        if (isGtmApplicable() && !Login.isLoginPages()) {
            var info = gtmDataLayerInfo(data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? data : null);
            dataLayer[0] = info.data;
            dataLayer.push(info.data);
            dataLayer.push({ event: info.event });
        }
    };

    var pageTitle = function pageTitle() {
        var t = /^.+[:-]\s*(.+)$/.exec(document.title);
        return t && t[1] ? t[1] : document.title;
    };

    var eventHandler = function eventHandler(get_settings) {
        if (!isGtmApplicable()) return;
        var is_login = localStorage.getItem('GTM_login') === '1';
        var is_new_account = localStorage.getItem('GTM_new_account') === '1';
        if (!is_login && !is_new_account) return;

        localStorage.removeItem('GTM_login');
        localStorage.removeItem('GTM_new_account');

        var affiliate_token = Cookies.getJSON('affiliate_tracking');
        if (affiliate_token) {
            pushDataLayer({ bom_affiliate_token: affiliate_token.t });
        }

        var data = {
            visitorId: ClientBase.get('loginid'),
            bom_currency: ClientBase.get('currency'),
            bom_country: get_settings.country,
            bom_country_abbrev: get_settings.country_code,
            bom_email: get_settings.email,
            url: window.location.href,
            bom_today: Math.floor(Date.now() / 1000),
            event: is_new_account ? 'new_account' : 'log_in'
        };
        if (is_new_account) {
            data.bom_date_joined = data.bom_today;
        }
        if (!ClientBase.get('is_virtual')) {
            data.bom_age = parseInt((moment().unix() - get_settings.date_of_birth) / 31557600);
            data.bom_firstname = get_settings.first_name;
            data.bom_lastname = get_settings.last_name;
            data.bom_phone = get_settings.phone;
        }

        if (is_login) {
            BinarySocket.wait('mt5_login_list').then(function (response) {
                (response.mt5_login_list || []).forEach(function (obj) {
                    var acc_type = (ClientBase.getMT5AccountType(obj.group) || '').replace('real_vanuatu', 'financial').replace('vanuatu_', '').replace('costarica', 'gaming'); // i.e. financial_cent, demo_cent, demo_gaming, real_gaming
                    if (acc_type) {
                        data['mt5_' + acc_type + '_id'] = obj.login;
                    }
                });
                pushDataLayer(data);
            });
        } else {
            pushDataLayer(data);
        }
    };

    var pushPurchaseData = function pushPurchaseData(response) {
        if (!isGtmApplicable() || ClientBase.get('is_virtual')) return;
        var buy = response.buy;
        if (!buy) return;
        var req = response.echo_req.passthrough;
        var data = {
            event: 'buy_contract',
            visitorId: ClientBase.get('loginid'),
            bom_symbol: req.symbol,
            bom_market: getElementById('contract_markets').value,
            bom_currency: req.currency,
            bom_contract_type: req.contract_type,
            bom_contract_id: buy.contract_id,
            bom_transaction_id: buy.transaction_id,
            bom_buy_price: buy.buy_price,
            bom_payout: buy.payout
        };
        Object.assign(data, {
            bom_amount: req.amount,
            bom_basis: req.basis,
            bom_expiry_type: getElementById('expiry_type').value
        });
        if (data.bom_expiry_type === 'duration') {
            Object.assign(data, {
                bom_duration: req.duration,
                bom_duration_unit: req.duration_unit
            });
        }
        if (isVisible(getElementById('barrier'))) {
            data.bom_barrier = req.barrier;
        } else if (isVisible(getElementById('barrier_high'))) {
            data.bom_barrier_high = req.barrier;
            data.bom_barrier_low = req.barrier2;
        }
        if (isVisible(getElementById('prediction'))) {
            data.bom_prediction = req.barrier;
        }

        pushDataLayer(data);
    };

    var mt5NewAccount = function mt5NewAccount(response) {
        var acc_type = response.mt5_new_account.mt5_account_type ? response.mt5_new_account.account_type + '_' + response.mt5_new_account.mt5_account_type : // financial_cent, demo_cent, ...
        (response.mt5_new_account.account_type === 'demo' ? 'demo' : 'real') + '_gaming'; // demo_gaming, real_gaming

        var gtm_data = {
            event: 'mt5_new_account',
            bom_email: ClientBase.get('email'),
            bom_country: State.getResponse('get_settings.country'),
            mt5_last_signup: acc_type
        };

        gtm_data['mt5_' + acc_type + '_id'] = response.mt5_new_account.login;

        if (/demo/.test(acc_type) && !ClientBase.get('is_virtual')) {
            gtm_data.visitorId = ClientBase.getAccountOfType('virtual').loginid;
        }

        pushDataLayer(gtm_data);
    };

    return {
        pushDataLayer: pushDataLayer,
        eventHandler: eventHandler,
        pushPurchaseData: pushPurchaseData,
        mt5NewAccount: mt5NewAccount,
        setLoginFlag: function setLoginFlag() {
            if (isGtmApplicable()) localStorage.setItem('GTM_login', '1');
        }
    };
}();

module.exports = GTM;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlForLanguage = __webpack_require__(15).urlFor;
var urlLang = __webpack_require__(15).urlLang;
var createElement = __webpack_require__(1).createElement;
var isEmptyObject = __webpack_require__(1).isEmptyObject;
__webpack_require__(269);

var Url = function () {
    var location_url = void 0,
        static_host = void 0;

    var init = function init(url) {
        location_url = url ? getLocation(url) : window.location;
    };

    var getLocation = function getLocation(url) {
        return createElement('a', { href: decodeURIComponent(url) });
    };

    var reset = function reset() {
        location_url = window ? window.location : location_url;
    };

    var params = function params(href) {
        var arr_params = [];
        var parsed = ((href ? new URL(href) : location_url).search || '').substr(1).split('&');
        var p_l = parsed.length;
        while (p_l--) {
            var param = parsed[p_l].split('=');
            arr_params.push(param);
        }
        return arr_params;
    };

    var paramsHash = function paramsHash(href) {
        var param_hash = {};
        var arr_params = params(href);
        var param = arr_params.length;
        while (param--) {
            if (arr_params[param][0]) {
                param_hash[arr_params[param][0]] = arr_params[param][1] || '';
            }
        }
        return param_hash;
    };

    var paramsHashToString = function paramsHashToString(pars) {
        return isEmptyObject(pars) ? '' : Object.keys(pars).map(function (key) {
            return key + '=' + (pars[key] || '');
        }).join('&');
    };

    var normalizePath = function normalizePath(path) {
        return path ? path.replace(/(^\/|\/$|[^a-zA-Z0-9-_/])/g, '') : '';
    };

    var urlFor = function urlFor(path, pars, language) {
        var lang = (language || urlLang()).toLowerCase();
        // url language might differ from passed language, so we will always replace using the url language
        var url_lang = language ? urlLang().toLowerCase() : lang;
        var url = window.location.href;
        var new_url = '' + url.substring(0, url.indexOf('/' + url_lang + '/') + url_lang.length + 2) + (normalizePath(path) || 'home' + (lang === 'ja' ? '-jp' : '')) + '.html' + (pars ? '?' + pars : '');
        // replace old lang with new lang
        return urlForLanguage(lang, new_url);
    };

    var urlForStatic = function urlForStatic() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (!static_host || static_host.length === 0) {
            static_host = document.querySelector('script[src*="vendor.min.js"]');
            if (static_host) {
                static_host = static_host.getAttribute('src');
            }

            if (static_host && static_host.length > 0) {
                static_host = static_host.substr(0, static_host.indexOf('/js/') + 1);
            } else {
                static_host = Url.websiteUrl();
            }
        }

        return static_host + path.replace(/(^\/)/g, '');
    };

    /**
     * @param {Object} new_params - Object with param-value pairs. To delete param, set value to null.
     * @param {boolean} should_preserve_old - Should existing query parameters be preserved.
     */
    var updateParamsWithoutReload = function updateParamsWithoutReload(new_params, should_preserve_old) {
        var updated_params = should_preserve_old ? Object.assign(paramsHash(), new_params) : new_params;
        Object.keys(new_params).forEach(function (key) {
            if (new_params[key] === null) {
                delete updated_params[key];
            }
        });
        var url = new URL(window.location);
        url.search = paramsHashToString(updated_params);
        window.history.replaceState({ url: url.href }, '', url.href);
    };

    var getSection = function getSection() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
        return (url.match(new RegExp('/' + urlLang() + '/(.*)/', 'i')) || [])[1];
    };

    var getHashValue = function getHashValue(name) {
        var hash = (location_url || window.location).hash;
        var value = hash.split('=');
        return new RegExp(name).test(hash) && value.length > 1 ? value[1] : '';
    };

    return {
        init: init,
        reset: reset,
        paramsHash: paramsHash,
        getLocation: getLocation,
        paramsHashToString: paramsHashToString,
        urlFor: urlFor,
        urlForStatic: urlForStatic,
        getSection: getSection,
        getHashValue: getHashValue,
        updateParamsWithoutReload: updateParamsWithoutReload,

        param: function param(name) {
            return paramsHash()[name];
        },
        websiteUrl: function websiteUrl() {
            return 'https://www.binary.com/';
        }
    };
}();

module.exports = Url;

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _socket_base = __webpack_require__(53);

var _socket_base2 = _interopRequireDefault(_socket_base);

var _subscription_manager = __webpack_require__(383);

var _subscription_manager2 = _interopRequireDefault(_subscription_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAO = function () {
    var getAccountStatus = function getAccountStatus() {
        return _socket_base2.default.send({ get_account_status: 1 });
    };

    var getActiveSymbols = function getActiveSymbols() {
        return _socket_base2.default.send({ active_symbols: 'brief' });
    };

    var getContractsFor = function getContractsFor(symbol) {
        return _socket_base2.default.send({ contracts_for: symbol });
    };

    var getLandingCompany = function getLandingCompany(residence) {
        return _socket_base2.default.send({ landing_company: residence });
    };

    var getMt5LoginList = function getMt5LoginList() {
        return _socket_base2.default.send({ mt5_login_list: 1 });
    };

    var getPayoutCurrencies = function getPayoutCurrencies() {
        return _socket_base2.default.send({ payout_currencies: 1 });
    };

    var getSelfExclusion = function getSelfExclusion() {
        return _socket_base2.default.send({ get_self_exclusion: 1 });
    };

    var getSettings = function getSettings() {
        return _socket_base2.default.send({ get_settings: 1 });
    };

    var getWebsiteStatus = function getWebsiteStatus() {
        return _socket_base2.default.send({ website_status: 1 });
    };

    var sendLogout = function sendLogout() {
        return _socket_base2.default.send({ logout: 1 });
    };

    var getStatement = function getStatement(limit, offset, date_boundaries) {
        return _socket_base2.default.send(_extends({
            statement: 1,
            description: 1,
            limit: limit,
            offset: offset
        }, date_boundaries));
    };

    // ----- Streaming calls -----
    var subscribeBalance = function subscribeBalance(cb) {
        return _subscription_manager2.default.subscribe('balance', { balance: 1, subscribe: 1 }, cb);
    };

    var subscribeTicks = function subscribeTicks(symbol, cb, should_forget_first) {
        return _subscription_manager2.default.subscribe('ticks', { ticks: symbol, subscribe: 1 }, cb, should_forget_first);
    };

    var subscribeWebsiteStatus = function subscribeWebsiteStatus(cb) {
        return _subscription_manager2.default.subscribe('website_status', { website_status: 1, subscribe: 1 }, cb);
    };

    var forget = function forget(msg_type, cb) {
        return _subscription_manager2.default.forget(msg_type, cb);
    };

    var forgetAll = function forgetAll() {
        return _subscription_manager2.default.forgetAll.apply(_subscription_manager2.default, arguments);
    };

    return {
        getAccountStatus: getAccountStatus,
        getActiveSymbols: getActiveSymbols,
        getContractsFor: getContractsFor,
        getLandingCompany: getLandingCompany,
        getMt5LoginList: getMt5LoginList,
        getPayoutCurrencies: getPayoutCurrencies,
        getSelfExclusion: getSelfExclusion,
        getSettings: getSettings,
        getWebsiteStatus: getWebsiteStatus,
        getStatement: getStatement,
        sendLogout: sendLogout,

        // streams
        subscribeBalance: subscribeBalance,
        subscribeTicks: subscribeTicks,
        subscribeWebsiteStatus: subscribeWebsiteStatus,
        forget: forget,
        forgetAll: forgetAll
    };
}();

exports.default = DAO;

/***/ })

},[384]);
//# sourceMappingURL=binary_app.js.map