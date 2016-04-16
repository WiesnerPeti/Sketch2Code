#import "Template.h"
@implementation Template
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if(self)
    {
	_backgroundView = [UIView new];
	_backgroundView.backgroundColor = [UIColor colorWithRed: green: blue: alpha:];


	_priceBarImageView = [UIView new];
	_priceBarImageView.backgroundColor = [UIColor colorWithRed: green: blue: alpha:];


	_priceLabel = [UILabel new];
	_priceLabel.text = [@"$220"];
	_priceLabel.textColor = [UIColor colorWithRed: green: blue: alpha:];


	_titleLabel = [UILabel new];
	_titleLabel.text = [@"Section"];
	_titleLabel.textColor = [UIColor colorWithRed: green: blue: alpha:];


	_arrow = [UIView new];




	[self addSubview:_backgroundView];
	[self addSubview:_priceBarImageView];
	[self addSubview:_priceLabel];
	[self addSubview:_titleLabel];
	[self addSubview:_arrow];

    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];

	[_backgroundView setFrame:CGRectMake(0,1,320,50)];
	[_priceBarImageView setFrame:CGRectMake(60,23,173,9)];
	[_priceLabel setFrame:CGRectMake(244,19,28,17)];
	[_titleLabel setFrame:CGRectMake(9,18,43,17)];
	[_arrow setFrame:CGRectMake(299,22,5,10)];

}
@end
