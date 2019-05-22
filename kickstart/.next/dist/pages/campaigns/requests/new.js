"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _layout = require("../../../components/layout");

var _layout2 = _interopRequireDefault(_layout);

var _campaign = require("../../../ethereum/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _web = require("../../../ethereum/web3");

var _web2 = _interopRequireDefault(_web);

var _routes = require("../../../routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "D:\\Ethereum\\ethereum-learning-projects\\kickstart\\pages\\campaigns\\requests\\new.js?entry";


var RequestNew = function (_Component) {
  (0, _inherits3.default)(RequestNew, _Component);

  function RequestNew() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestNew);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestNew.__proto__ || (0, _getPrototypeOf2.default)(RequestNew)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      description: "",
      value: "",
      recipient: "",
      errorMessage: "",
      loading: false
    }, _this.onSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var campaign, _this$state, description, value, recipient, accounts;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();

                _this.setState({ loading: true, errorMessage: "" });
                campaign = (0, _campaign2.default)(_this.props.address);
                _this$state = _this.state, description = _this$state.description, value = _this$state.value, recipient = _this$state.recipient;
                _context.prev = 4;
                _context.next = 7;
                return _web2.default.eth.getAccounts();

              case 7:
                accounts = _context.sent;
                _context.next = 10;
                return campaign.methods.createRequest(description, _web2.default.utils.toWei(value, "Ether"), recipient).send({ from: accounts[0] });

              case 10:
                _routes.Router.replaceRoute("/campaigns/" + _this.props.address + "/requests");
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](4);

                _this.setState({ errorMessage: _context.t0.message });

              case 16:
                _this.setState({ loading: false });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 13]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestNew, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(_layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, _react2.default.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, "Create a new Requst here"), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, _react2.default.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, "Description"), _react2.default.createElement(_semanticUiReact.Input, {
        value: this.state.description,
        onChange: function onChange(event) {
          return _this3.setState({ description: event.target.value });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      })), _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, "Value"), _react2.default.createElement(_semanticUiReact.Input, {
        label: "ether",
        labelPosition: "right",
        value: this.state.value,
        onChange: function onChange(event) {
          return _this3.setState({ value: event.target.value });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      })), _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, _react2.default.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, "Recipient Address"), _react2.default.createElement(_semanticUiReact.Input, {
        value: this.state.recipient,
        onChange: function onChange(event) {
          return _this3.setState({ recipient: event.target.value });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      })), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: "Oops!", content: this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { primary: true, loading: this.state.loading, __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, "Create"), _react2.default.createElement(_routes.Link, { route: "/campaigns/" + this.props.address + "/requests", __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, _react2.default.createElement("a", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { secondary: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, "Back")))));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
        var address;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                address = props.query.address;
                return _context2.abrupt("return", { address: address });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getInitialProps(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return RequestNew;
}(_react.Component);

exports.default = RequestNew;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxjYW1wYWlnbnNcXHJlcXVlc3RzXFxuZXcuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJGb3JtIiwiSW5wdXQiLCJNZXNzYWdlIiwiQnV0dG9uIiwiTGF5b3V0IiwiQ2FtcGFpZ24iLCJ3ZWIzIiwiTGluayIsIlJvdXRlciIsIlJlcXVlc3ROZXciLCJzdGF0ZSIsImRlc2NyaXB0aW9uIiwidmFsdWUiLCJyZWNpcGllbnQiLCJlcnJvck1lc3NhZ2UiLCJsb2FkaW5nIiwib25TdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2V0U3RhdGUiLCJjYW1wYWlnbiIsInByb3BzIiwiYWRkcmVzcyIsImV0aCIsImdldEFjY291bnRzIiwiYWNjb3VudHMiLCJtZXRob2RzIiwiY3JlYXRlUmVxdWVzdCIsInV0aWxzIiwidG9XZWkiLCJzZW5kIiwiZnJvbSIsInJlcGxhY2VSb3V0ZSIsIm1lc3NhZ2UiLCJ0YXJnZXQiLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU0sQUFBTyxBQUFTOztBQUMvQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFTLEFBQU0sQUFBYzs7Ozs7OztJLEFBRXZCOzs7Ozs7Ozs7Ozs7Ozs7b04sQUFDSjttQkFBUSxBQUNPLEFBQ2I7YUFGTSxBQUVDLEFBQ1A7aUJBSE0sQUFHSyxBQUNYO29CQUpNLEFBSVEsQUFDZDtlQUxNLEFBS0csQTtBQUxILEFBQ04sYSxBQWFGOzJGQUFXLGlCQUFBLEFBQU0sT0FBTjtrRUFBQTs7c0VBQUE7b0JBQUE7NkNBQUE7bUJBQ1Q7c0JBQUEsQUFBTSxBQUVOOztzQkFBQSxBQUFLLFNBQVMsRUFBRSxTQUFGLEFBQVcsTUFBTSxjQUEvQixBQUFjLEFBQStCLEFBQ3ZDO0FBSkcsMkJBSVEsd0JBQVMsTUFBQSxBQUFLLE1BSnRCLEFBSVEsQUFBb0I7OEJBQ0ssTUFMakMsQUFLc0MsT0FMdEMsQUFLRCwwQkFMQyxBQUtELGFBTEMsQUFLWSxvQkFMWixBQUtZLE9BTFosQUFLbUIsd0JBTG5CLEFBS21CO2dDQUxuQjtnQ0FBQTt1QkFRZ0IsY0FBQSxBQUFLLElBUnJCLEFBUWdCLEFBQVM7O21CQUExQjtBQVJDLG9DQUFBO2dDQUFBO3VCQVVELFNBQUEsQUFBUyxRQUFULEFBQ0gsY0FERyxBQUNXLGFBQWEsY0FBQSxBQUFLLE1BQUwsQUFBVyxNQUFYLEFBQWlCLE9BRHpDLEFBQ3dCLEFBQXdCLFVBRGhELEFBQzBELFdBRDFELEFBRUgsS0FBSyxFQUFFLE1BQU0sU0FaVCxBQVVELEFBRUUsQUFBUSxBQUFTOzttQkFDekI7K0JBQUEsQUFBTyw2QkFBMkIsTUFBQSxBQUFLLE1BQXZDLEFBQTZDLFVBYnRDO2dDQUFBO0FBQUE7O21CQUFBO2dDQUFBO2dEQWVQOztzQkFBQSxBQUFLLFNBQVMsRUFBRSxjQUFjLFlBZnZCLEFBZVAsQUFBYyxBQUFvQjs7bUJBRXBDO3NCQUFBLEFBQUssU0FBUyxFQUFFLFNBakJQLEFBaUJULEFBQWMsQUFBVzs7bUJBakJoQjttQkFBQTtnQ0FBQTs7QUFBQTtpQ0FBQTtBOzs7Ozs7Ozs7OzZCQW9CRjttQkFDUDs7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FERixBQUNFLEFBQ0EsNkNBQUEsQUFBQyx1Q0FBSyxVQUFVLEtBQWhCLEFBQXFCLFVBQVUsT0FBTyxDQUFDLENBQUMsS0FBQSxBQUFLLE1BQTdDLEFBQW1EO29CQUFuRDtzQkFBQSxBQUNFO0FBREY7eUJBQ0csY0FBRCxzQkFBQSxBQUFNOztvQkFBTjtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FERixBQUNFLEFBQ0EsZ0NBQUEsQUFBQztlQUNRLEtBQUEsQUFBSyxNQURkLEFBQ29CLEFBQ2xCO2tCQUFVLHlCQUFBO2lCQUNSLE9BQUEsQUFBSyxTQUFTLEVBQUUsYUFBYSxNQUFBLEFBQU0sT0FEM0IsQUFDUixBQUFjLEFBQTRCO0FBSDlDOztvQkFBQTtzQkFISixBQUNFLEFBRUUsQUFRRjtBQVJFO0FBQ0UsMkJBT0gsY0FBRCxzQkFBQSxBQUFNOztvQkFBTjtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FERixBQUNFLEFBQ0EsMEJBQUEsQUFBQztlQUFELEFBQ1EsQUFDTjt1QkFGRixBQUVnQixBQUNkO2VBQU8sS0FBQSxBQUFLLE1BSGQsQUFHb0IsQUFDbEI7a0JBQVUseUJBQUE7aUJBQVMsT0FBQSxBQUFLLFNBQVMsRUFBRSxPQUFPLE1BQUEsQUFBTSxPQUF0QyxBQUFTLEFBQWMsQUFBc0I7QUFKekQ7O29CQUFBO3NCQWJKLEFBV0UsQUFFRSxBQVFGO0FBUkU7QUFDRSwyQkFPSCxjQUFELHNCQUFBLEFBQU07O29CQUFOO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQURGLEFBQ0UsQUFDQSxzQ0FBQSxBQUFDO2VBQ1EsS0FBQSxBQUFLLE1BRGQsQUFDb0IsQUFDbEI7a0JBQVUseUJBQUE7aUJBQ1IsT0FBQSxBQUFLLFNBQVMsRUFBRSxXQUFXLE1BQUEsQUFBTSxPQUR6QixBQUNSLEFBQWMsQUFBMEI7QUFINUM7O29CQUFBO3NCQXZCSixBQXFCRSxBQUVFLEFBUUY7QUFSRTtBQUNFLDJCQU9KLEFBQUMsMENBQVEsT0FBVCxNQUFlLFFBQWYsQUFBc0IsU0FBUSxTQUFTLEtBQUEsQUFBSyxNQUE1QyxBQUFrRDtvQkFBbEQ7c0JBL0JGLEFBK0JFLEFBQ0E7QUFEQTswQkFDQSxBQUFDLHlDQUFPLFNBQVIsTUFBZ0IsU0FBUyxLQUFBLEFBQUssTUFBOUIsQUFBb0M7b0JBQXBDO3NCQUFBO0FBQUE7U0FoQ0YsQUFnQ0UsQUFHQSwyQkFBQSxBQUFDLDhCQUFLLHVCQUFxQixLQUFBLEFBQUssTUFBMUIsQUFBZ0MsVUFBdEM7b0JBQUE7c0JBQUEsQUFDRTtBQURGO3lCQUNFLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUMseUNBQU8sV0FBUjtvQkFBQTtzQkFBQTtBQUFBO1NBeENWLEFBQ0UsQUFFRSxBQW1DRSxBQUNFLEFBQ0UsQUFNWDs7Ozs7NkdBekU0QixBOzs7OzttQkFDbkI7QSwwQkFBWSxNLEFBQU0sTUFBbEIsQTtrREFFRCxFQUFFLFMsQUFBRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVpjLEEsQUFxRnpCOztrQkFBQSxBQUFlIiwiZmlsZSI6Im5ldy5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJEOi9FdGhlcmV1bS9ldGhlcmV1bS1sZWFybmluZy1wcm9qZWN0cy9raWNrc3RhcnQifQ==