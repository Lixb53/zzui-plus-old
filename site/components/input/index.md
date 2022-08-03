# Input 输入框

## 基础用法

<demo src="./example/basic-input.vue" title="输入框" desc="这是一个 Input 输入框"></demo>

## 禁用状态

<demo src="./example/disabled-input.vue" title="输入框" desc="通过 disabled 属性指定是否禁用 input 组件"></demo>

## 一键清空

使用 clearable 属性即可得到一个可一键清空的输入框

<demo src="./example/clearable-input.vue"></demo>

## 格式化

在 formatter 的情况下显示值，我们通常同时使用 parser

<demo src="./example/formatter-input.vue"></demo>

## 文本域

<demo src="./example/textarea-input.vue" title="文本域" desc="用于输入多行文本信息可缩放的输入框。 Resizable for entering multiple lines of text"></demo>

## 带图标的输入框

<demo src="./example/icon-input.vue" title="带图标的输入框" desc="带有图标标记输入类型"></demo>

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮

要在输入框中添加图标，你可以简单地使用 prefix-icon 和 suffix-icon 属性。 另外， prefix 和 suffix 命名的插槽也能正常工作。

<demo src="./example/compound-input.vue"></demo>
